package temporal

import (
	"github.com/google/go-cmp/cmp"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"path"
	"testing"
)

func TestKitchenSinkSpringBoot(t *testing.T) {
	R := require.New(t)
	A := assert.New(t)
	filePath := path.Join("fixtures/application-kitchensink.yaml")
	cfg, err := NewConfig(filePath)
	R.NoError(err)

	expect := &Config{
		Cache: &Cache{
			MaxInstances: 242,
			MaxThreads:   0,
		},
		Namespaces: map[string]*Namespace{
			"my-cloud-namespace.accountid": &Namespace{
				Workers: []*Worker{
					&Worker{
						TaskQueue: "weird-task-queue",
						Name:      "",
						Capacity: &Capacity{
							MaxConcurrentWorkflowTaskExecutors:  1,
							MaxConcurrentActivityExecutors:      1,
							MaxConcurrentLocalActivityExecutors: 1,
							MaxConcurrentWorkflowTaskPollers:    3,
							MaxConcurrentActivityTaskPollers:    3,
						},
						RateLimits: &RateLimits{
							MaxWorkerActivitiesPerSecond:    2,
							MaxTaskQueueActivitiesPerSecond: 2,
						},
					},
					&Worker{
						TaskQueue: "other-task-que",
						Name:      "",
						Capacity: &Capacity{
							MaxConcurrentWorkflowTaskExecutors:  2,
							MaxConcurrentActivityExecutors:      2,
							MaxConcurrentLocalActivityExecutors: 2,
							MaxConcurrentWorkflowTaskPollers:    5,
							MaxConcurrentActivityTaskPollers:    5,
						},
						RateLimits: &RateLimits{
							MaxWorkerActivitiesPerSecond:    3,
							MaxTaskQueueActivitiesPerSecond: 3,
						},
					},
				},
				Connection: &Connection{
					Namespace:   "my-cloud-namespace.accountid",
					Target:      "my-cloud-namespace.accountid.tmprl.cloud:7233",
					EnableHttps: false,
					MTLS: &MTLS{
						PKCS:                 0,
						Key:                  "",
						KeyFile:              "/path/to/cert.key",
						CertChain:            "",
						CertChainFile:        "/path/to/cert.pem",
						KeyPassword:          "",
						InsecureTrustManager: false,
					},
				},
			},
		},
	}
	A.Empty(cmp.Diff((&Config{}).WithDefaults(), cfg))
	A.Empty(cmp.Diff(expect, cfg))

}

func TestBasicConfigFromSpringboot(t *testing.T) {
	R := require.New(t)
	A := assert.New(t)
	filePath := path.Join("fixtures/application.yaml")
	cfg, err := NewConfig(filePath)
	R.NoError(err)

	expect := &Config{
		Cache: &Cache{
			MaxInstances: 0,
			MaxThreads:   0,
		},
		Namespaces: map[string]*Namespace{
			"default": &Namespace{
				Workers: nil,
				Connection: &Connection{
					Namespace:   "default",
					Target:      "local",
					EnableHttps: false,
					MTLS: &MTLS{
						PKCS:                 0,
						Key:                  "",
						KeyFile:              "/path/to/cert.key",
						CertChain:            "",
						CertChainFile:        "/path/to/cert.pem",
						KeyPassword:          "",
						InsecureTrustManager: false,
					},
				},
			},
		},
	}
	A.Empty(cmp.Diff((&Config{}).WithDefaults(), cfg))
	A.Empty(cmp.Diff(expect, cfg))

}
