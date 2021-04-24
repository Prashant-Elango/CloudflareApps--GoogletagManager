(function(){
    'use strict'

    function GenerateGoogleHeadTag(google_tag_id)
    {
        var google_Script = `<!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-XXXX');</script>
        <!-- End Google Tag Manager -->`;
        
        return google_Script.replace("GTM-XXXX",google_tag_id);
    }

    function GenerateGoogleBodyTag(google_tag_id)
    {
        var google_body_script = `<!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXX"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->`;

        return google_body_script.replace("GTM-XXXX",google_tag_id);
    }

    var google_tag_id = INSTALL_OPTIONS.google_tag_id;
    if(google_tag_id === undefined)
    {
        console.error("Google Tag Manger -- Missing ID");
    }

    /* Insert Google Tag Manager script at Head */
    var HeadTag = document.head;
    var existing_HeadContent = HeadTag.innerHTML;
    HeadTag.innerHTML = GenerateGoogleHeadTag(google_tag_id) + existing_HeadContent;

    /* Insert Google Tag Manager Script at body */
    var BodyTag = document.body;
    var existing_BodyContent = BodyTag.innerHTML;
    BodyTag.innerHTML = GenerateGoogleBodyTag(google_tag_id) + existing_BodyContent;
    
})()