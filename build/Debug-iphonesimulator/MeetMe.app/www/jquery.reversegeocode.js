/* reversegeocode - jQuery plugin for reverse geocoding using the Google Maps API.
 *
 * By Jon Bringhurst (jon@bringhurst.org)
 */

(function($){
    $.fn.extend({
        reversegeocode: function(options) {
            return this.each(function() {
                var geocoder = new GClientGeocoder();;
                var obj = $(this);

                function getAddress(response) {
                    if (!response || response.Status.code != 200) {
                        return;
                        //alert("Status Code:" + response.Status.code);
                    } else {
                        place = response.Placemark[0];
                        if(!place.address || !obj) {
                            //alert("The address returned was null or there's an internal jQuery problem.");
                            return;
                        } else {
                            obj.html(place.address);
                        }
                    }
                }

                if( !options.lat || !options.lng ) {
                    //alert("Bad options, you must input valid coordinates.");
                    return;
                } else {
                    var ll = new GLatLng(options.lat, options.lng)
                    if (ll) {
                        geocoder.getLocations(ll, getAddress);
                    }
                }
            });
        }
    });
})(jQuery);
