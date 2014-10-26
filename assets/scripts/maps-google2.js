var MapsGoogle = function () {


    var mapPolygone = function () {
        var map = new GMaps({
            div: '#gmap_polygons',
            lat: -33.547254,
            lng: -61.863336
        });

        var path = [
            [-33.541138, -61.860697],
            [-33.548488, -61.854968],
            [-33.554550, -61.865814],
            [-33.546458, -61.872434]
        ];

        var polygon = map.drawPolygon({
            paths: path,
            strokeColor: '#BBD8E9',
            strokeOpacity: 1,
            strokeWeight: 3,
            fillColor: '#BBD8E9',
            fillOpacity: 0.6
        });
    }


    return {
        //main function to initiate map samples
        init: function () {
            mapPolygone();
        }

    };

}();