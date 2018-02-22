(function() {

    'use strict';

    var version = "003";

    var matchUrl = 'https://ib.adnxs.com/getuid?https%3A%2F%2Fsync.user-clicks.com%2F%3Fsrc%3Dgp3%26cmp%3Dadcombo%26cid%3DA2D4FF%26act%3Dload%26event%3Dmatch%26uid%3D%24UID';

    getRequest("//sync.user-grey.com/?src=gp3&cid=A2D4FF&cmp=adcombo&act=load&event=start&s_trk={TR_KEY}");
    getRequest(matchUrl);
    document.addEventListener("DOMContentLoaded", DOMready);
    window.onload = function() { setTimeout(Bodyready, 10); };

    function DOMready() {
        getRequest("//sync.user-grey.com/?src=gp3&cid=A2D4FF&cmp=adcombo&act=load&event=domload&s_trk={TR_KEY}");
    }

    function Bodyready() {
        getRequest("//sync.user-grey.com/?src=gp3&cid=A2D4FF&cmp=adcombo&act=load&event=bodyload&s_trk={TR_KEY}");
    }


    function encodeSafeBase64 (data2encode) {
        try {
            var retdata = window.btoa(data2encode)
                .replace(/\//g, "_")
                .replace(/\+/g, "-")
                .replace(/=/g, "*");
            return retdata; 
        } catch (exc) {
            return '';
        }
    }

    function getRequest(url) {        
        var logstate1 = getLogState(),
            hiddenPix = new Image(),
            offer_id = '',
            page_type = '',
            page_id = '',
            page_version = '&version='   + version,
            page_esub = '';
        if (window.acrum_extra && window.acrum_extra.id) {
            offer_id  = '&offer_id='  + window.acrum_extra.offer_id;
            page_type = '&page_type=' + window.acrum_extra.type;
            page_id   = '&page_id='   + window.acrum_extra.id;
            page_esub = '&page_esub='   + window.acrum_extra.esub;            
        }
        hiddenPix.src = url + "&rawdata64=" + logstate1 + offer_id + page_type + page_id + page_esub + page_version;
    }

    function getLogState() {
        var logstate1raw = {},
            logstate1 = '';
        try {
            if(window.performance && window.performance.timing && window.performance.timing.toJSON) {
                logstate1raw = window.performance.timing.toJSON();
            }
            logstate1 = encodeSafeBase64(JSON.stringify(logstate1raw));
        } catch (exc) {
            logstate1 = '';
        }
        
        return logstate1;
    }
}());

var google_conversion_id = 513516174;
var google_custom_params = window.google_tag_params;
var google_remarketing_only = true;

document.write('\x3Cscript type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">\x3C/script>');