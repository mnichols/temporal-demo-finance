package temporal

import (
	"gopkg.in/yaml.v3"
	"os"
)

const (
	defaultCacheMaxInstances                           = 1000
	defaultCacheMaxThreads                             = 0
	defaultRateLimitsMaxWorkerActivitiesPerSecond      = 100000
	defaultRateLimitsMaxTaskQueueActivitiesPerSecond   = 100000
	defaultCapacityMaxConcurrentWorkflowTaskExecutors  = 1000
	defaultCapacityMaxConcurrentActivityExecutors      = 1000
	defaultCapacityMaxConcurrentLocalActivityExecutors = 1000
	defaultCapacityMaxConcurrentWorkflowTaskPollers    = 2
	defaultCapacityMaxConcurrentActivityTaskPollers    = 2
)

const (
	defaultConnectionNamespace = "default"
	defaultConnectionTarget    = "local"
)

type MTLS struct {
	PKCS                 int    `yaml:"pkcs"`
	Key                  string `yaml:"key"`
	KeyFile              string `yaml:"key-file"`
	CertChain            string `yaml:"cert-chain"`
	CertChainFile        string `yaml:"cert-chain-file"`
	KeyPassword          string `yaml:"key-password"`
	InsecureTrustManager bool   `yaml:"insecure-trust-manager"`
}

func (M *MTLS) WithDefaults() *MTLS {
	// there is no default for mtls
	return nil
}

type Connection struct {
	Namespace   string `yaml:"namespace"`
	Target      string `yaml:"target"`
	EnableHttps bool   `yaml:"enable-https"`
	MTLS        *MTLS  `yaml:"mtls"`
}

func (c *Connection) WithDefaults() *Connection {
	out := &Connection{}
	out.Namespace = ifZeroOrDefault(c.Namespace, defaultConnectionNamespace)

	out.Target = ifZeroOrDefault(c.Target, defaultConnectionTarget)
	out.MTLS = ifZeroOrDefault(c.MTLS, &MTLS{})
	return out
}

type Worker struct {
	TaskQueue  string      `yaml:"task-queue"`
	Name       string      `yaml:"name"`
	Capacity   *Capacity   `yaml:"capacity"`
	RateLimits *RateLimits `yaml:"rate-limits"`
}

func (w *Worker) WithDefaults() *Worker {
	out := &Worker{}
	out.Capacity = ifZeroOrDefault(w.Capacity, &Capacity{})
	out.RateLimits = ifZeroOrDefault(w.RateLimits, &RateLimits{})
	out.TaskQueue = ifZeroOrDefault(w.TaskQueue, "default")
	return out
}

type Capacity struct {
	MaxConcurrentWorkflowTaskExecutors  int `yaml:"max-concurrent-workflow-task-executors"`
	MaxConcurrentActivityExecutors      int `yaml:"max-concurrent-activity-executors"`
	MaxConcurrentLocalActivityExecutors int `yaml:"max-concurrent-local-activity-executors"`
	MaxConcurrentWorkflowTaskPollers    int `yaml:"max-concurrent-workflow-task-pollers"`
	MaxConcurrentActivityTaskPollers    int `yaml:"max-concurrent-activity-task-pollers"`
}

func (c *Capacity) WithDefaults() *Capacity {

	return &Capacity{
		MaxConcurrentWorkflowTaskExecutors:  ifZeroOrDefault(c.MaxConcurrentWorkflowTaskExecutors, defaultCapacityMaxConcurrentWorkflowTaskExecutors),
		MaxConcurrentActivityExecutors:      ifZeroOrDefault(c.MaxConcurrentActivityExecutors, defaultCapacityMaxConcurrentActivityExecutors),
		MaxConcurrentLocalActivityExecutors: ifZeroOrDefault(c.MaxConcurrentLocalActivityExecutors, defaultCapacityMaxConcurrentLocalActivityExecutors),
		MaxConcurrentWorkflowTaskPollers:    ifZeroOrDefault(c.MaxConcurrentWorkflowTaskPollers, defaultCapacityMaxConcurrentWorkflowTaskPollers),
		MaxConcurrentActivityTaskPollers:    ifZeroOrDefault(c.MaxConcurrentActivityTaskPollers, defaultCapacityMaxConcurrentActivityTaskPollers),
	}
}

type RateLimits struct {
	MaxWorkerActivitiesPerSecond    float64 `yaml:"max-worker-activities-per-second"`
	MaxTaskQueueActivitiesPerSecond float64 `yaml:"max-task-queue-activities-per-second"`
}

func (r *RateLimits) WithDefaults() *RateLimits {

	return &RateLimits{
		MaxWorkerActivitiesPerSecond:    ifZeroOrDefault(r.MaxWorkerActivitiesPerSecond, defaultRateLimitsMaxWorkerActivitiesPerSecond),
		MaxTaskQueueActivitiesPerSecond: ifZeroOrDefault(r.MaxTaskQueueActivitiesPerSecond, defaultRateLimitsMaxTaskQueueActivitiesPerSecond),
	}
}

type Cache struct {
	MaxInstances int `yaml:"max-instances"`
	MaxThreads   int `yaml:"max-threads"` // java
}

func (c *Cache) WithDefaults() *Cache {

	return &Cache{
		MaxInstances: ifZeroOrDefault(c.MaxInstances, defaultCacheMaxInstances),
		MaxThreads:   ifZeroOrDefault(c.MaxThreads, defaultCacheMaxThreads),
	}
}

type Namespace struct {
	Workers    []*Worker   `yaml:"workers"`
	Connection *Connection `yaml:"connection"`
}

func (n *Namespace) WithDefaults() *Namespace {
	out := &Namespace{}
	if len(n.Workers) == 0 {
		out.Workers = []*Worker{(&Worker{}).WithDefaults()}
	} else {
		out.Workers = n.Workers
	}
	out.Connection = ifZeroOrDefault(n.Connection, &Connection{})
	return out
}

type Config struct {
	Cache      *Cache                `yaml:"cache"`
	Namespaces map[string]*Namespace `yaml:"-"`
}

func (c *Config) WithDefaults() *Config {
	out := &Config{}
	out.Cache = ifZeroOrDefault(c.Cache, &Cache{})
	if len(c.Namespaces) == 0 {
		dn := ifZeroOrDefault(nil, &Namespace{})
		out.Namespaces = map[string]*Namespace{dn.Connection.Namespace: dn}
	} else {
		out.Namespaces = c.Namespaces
	}
	return out
}

type Root struct {
	Temporal *Config `yaml:"temporal"`
}

func (r *Root) getConfig() *Config {
	return r.Temporal.WithDefaults()
}

type SpringedConfig struct {
	Spring *Root `yaml:"spring"`
}

func (s *SpringedConfig) getConfig() *Config {
	return s.Spring.Temporal.WithDefaults()
}

func NewConfig(filePath string) (*Config, error) {
	var data []byte
	var err error
	data, err = os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}
	spring := map[string]yaml.Node{}
	if err = yaml.Unmarshal(data, &spring); err != nil {
		return nil, err
	}
	var cfg configHolder
	cfg = &Root{}
	if _, sprung := spring["spring"]; sprung {
		cfg = &SpringedConfig{}
	}
	if err = yaml.Unmarshal(data, cfg); err != nil {
		return nil, err
	}
	return cfg.getConfig(), nil
}

func ifZeroOrDefault[T comparable](val, dfault T) T {
	var z T
	if z != val {
		if d, ok := any(val).(defaulter[T]); ok {
			return d.WithDefaults()
		}
		return val
	}
	if d, ok := any(dfault).(defaulter[T]); ok {
		return d.WithDefaults()
	}
	return dfault
}

type defaulter[T any] interface {
	WithDefaults() T
}
type configHolder interface {
	getConfig() *Config
}
