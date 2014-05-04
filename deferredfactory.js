angular.module('TestApplication')

    .factory('ChartServicesTotalBytes', ['RedshiftRestangular','$q', function(RedshiftRestangular, $q) {
        var deferredLoad = $q.defer();
        var isLoaded = deferredLoad.promise;

        var TotalBytesUsedPerWorld = { "jsonData" : "" };

        isLoaded.then(function(data) {
            TotalBytesUsedPerWorld.jsonData = data;
            return TotalBytesUsedPerWorld;
        });

        var ChartFactory = {
            getJsonData : function() {
                return isLoaded;
            },
            initJsonData : function() {
                RedshiftRestangular.all("totalbytesusage").getList()
                    .then(function(response) {
                        deferredLoad.resolve(response);
                    })
            }
        };
        return ChartFactory;
    }])
