(function () {
    'use strict'

    function GenerateGoogleHeadTag(google_tag_id) {
        var google_Script = `<!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-XXXX');</script>
        <!-- End Google Tag Manager -->`;

        return google_Script.replace("GTM-XXXX", google_tag_id);
    }

    function GenerateGoogleBodyTag(google_tag_id) {
        var google_body_script = `<!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXX"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->`;

        return google_body_script.replace("GTM-XXXX", google_tag_id);
    }

    function InsertCodeIntoWebpage(google_tag_id) {
        /* Insert Google Tag Manager script at Head */
        var HeadTag = document.head;
        var existing_HeadContent = HeadTag.innerHTML;
        HeadTag.innerHTML = GenerateGoogleHeadTag(google_tag_id) + existing_HeadContent;

        /* Insert Google Tag Manager Script at body */
        var BodyTag = document.body;
        var existing_BodyContent = BodyTag.innerHTML;
        BodyTag.innerHTML = GenerateGoogleBodyTag(google_tag_id) + existing_BodyContent;
    }

    /* 
        Returns true when exclusion criteria is met.

        parameter:
        exclude_from_installing_Here : Array of strings ( ["google.com","0News0.com/"] )
    */
    function ExclusionCriteriaCheck(exclude_from_installing_Here) {

        if (exclude_from_installing_Here.length > 0) {

            for (var index = 0; index < exclude_from_installing_Here.length; index++) {

                if (exclude_from_installing_Here[index].length > 0) {

                    var matches = document.location.href.match(exclude_from_installing_Here[index]);
                    if (matches != undefined) {
                        return true;
                    }
                    else {
                        continue;
                    }
                }
            }
        }

        return false;
    }

    function main() {

        /* Get envrionment variables for Google tag id */
        var google_tag_id = INSTALL_OPTIONS.google_tag_id.trim();
        if (google_tag_id === undefined) {
            console.error("CloudflareApps--GoogleTagManager -- Missing ID");
            console.error("CloudflareApps--GoogleTagManager -- installation on hold");
            return -1;
        }

        /* Get Environment variables for page or domain exlusion*/
        var exclude_from_installing_Here = INSTALL_OPTIONS.exclude_url;

        /* Insert code on basis of Exclusion */
        if (ExclusionCriteriaCheck(exclude_from_installing_Here) == false) {
            /* Inserts code */
            InsertCodeIntoWebpage(google_tag_id);
        }

    }

    main();
})()