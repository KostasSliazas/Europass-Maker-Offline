$(function() {
    "use strict";
    var ef;
    var cssId = "styl";
    if (!document.getElementById(cssId)) {
        var head = document.getElementsByTagName("head")[0];
        var link = document.createElement("link");
        link.id = cssId;
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "style.css?v=2";
        link.media = "all";
        head.appendChild(link);
        document.oncontextmenu = function() {
            return false;
        };
    }

    $("ul, li, #sort").disableSelection();
    $(".blokas:first-child").prepend(
        '<button id="close" class="shd brdr w24" href="#">i</button>'
    );
    $("body").prepend(
        '<div id="info" style="display:none"><div id="infoc"><span class="btn brdr shd">Uždaryti &#10006;</span></div><div id="info-text">CV šablonų kūrėjas. Neuždaryti lango kol neišsaugoma, nes jokia informacija nėra išsaugoma duomenų bazėje. Išsaugoti tekstą reikia paspausti \'Enter\' Blokus galima sukeisti, du kartus spragtelėjus pelės klavišu keičiami kalbų lygiai. Galima \'inspektinti\' ir keisti betkokį tekstą naršyklėje dažniausia nuspaudus F12. Nuotraukos dydis turėtų būti 120x120 pikselių. Kiek galima sumažinti nuotraukos failo dydį. Jeigu nėra darbo patirties galima ištrinti bloką. Naršyklė Internet Explorer nepalaikoma. Išsaugotą CV galima naršyklėje išsaugoti PDF formatu paspaudus \'print\' ir \'print to file\'. Visi mygtukai bus ištrinti išsaugant CV.</div></div>');
    $("body").prepend(
        '<button onclick="htmls()" name="button" class="save brdr shd">Išsaugoti CV</button>'
    );
    $(".toka").prepend(
        '<button class="shd brdr wbg w24 add" id="dubl" name="button">+</button><button class="shd brdr wbg w24 rem" id="dubl6" name="button">-</button>'
    );
    $(".topr").prepend(
        '<button class="shd brdr wbg w24 add" id="dubl1" name="button">+</button><button class="shd brdr wbg w24 rem" id="dubl7" name="button">-</button>'
    );
    $("#darb").prepend(
        '<button id="reda" class="brdr shd">Ištrinti</button><button class="shd brdr wbg w24 add" id="dubl2" name="button">+</button><button class="shd brdr wbg w24 rem" id="dubl4" name="button">-</button>'
    );
    $("#prof").prepend(
        '<button class="shd brdr wbg w24 add" id="dubl3" name="button">+</button><button class="shd brdr wbg w24 rem" id="dubl5" name="button">-</button>'
    );
    $("#close,#infoc").on("click", function(e) {
        e.preventDefault();
        $("#info").css(
            "display",
            $("#info").css("display") === "none" ? "" : "none"
        );
    });
    var refresh = function refresh() {
        var my = $(".kCell,h3,.percent");
        var i = 1;
        my.each(function() {
            var ei = this.className;
            var er = ei.split(" ").pop();
            er = er.substring(0, 3);
            if (er !== "scs") {
                ei = ei + " scs" + i++;
                $(this).attr("class", ei);
            } else {
                ei = ei.replace(/[0-9]/g, "");
                $(this).attr("class", ei + i++);
            }
        });
    };
    refresh();
    var btnud =
        '<div id="fakebtn" class="brdr">Įkelti failą<input id="image_file" name="image_file" onchange="fileSelected();" type="file"></div>';
    var stre =
        '<div id="dele"><form action="" enctype="multipart/form-data" id="upload_form" method="post" name="upload_form"><div id="fileinfo"><div id="filename"></div><div id="filesize"></div><div id="filetype"></div><div id="filedim"></div></div><div id="error">Failas nepalaikomas! bmp, gif, jpeg, png, tiff</div><div id="error2">An error occurred while uploading the file</div><div id="abort">The upload has been canceled</div><div id="warnsize">Failas per didelis!</div><div id="progress_info"><div id="progress"></div><div id="progress_percent">&nbsp;</div><div class="clear_both"></div><div><div id="speed">&nbsp;</div><div id="remaining">&nbsp;</div><div id="b_transfered">&nbsp;</div><div class="clear_both"></div></div><div id="upload_response"></div></div></form></div>';
    $("#header").prepend(stre);
    $("#photo").prepend(btnud);
    $("body").on("click", ".progress", function(e) {
        e.preventDefault();
        var classes = [
            "bar c00",
            "bar c10",
            "bar c20",
            "bar c30",
            "bar c40",
            "bar c50",
            "bar c60",
            "bar c70",
            "bar c80",
            "bar c90",
            "bar c100"
        ];
        $(this)
            .children(".bar")
            .each(function() {
                this.className =
                    classes[($.inArray(this.className, classes) + 1) % classes.length];
            });
    });
    $("#cv").sortable({
        helper: "clone",
        forceHelperSize: !1,
        axis: "y"
    });
    var focused = document.activeElement;

    function outf() {
        $("#cv input").replaceWith(function() {
            if (this.id) {
                var id = this.id;
            }
            if (this.id === "email") {
                return $("<a />")
                    .attr({
                        class: this.className,
                        href: "mailto:" + $(this).val() + "?subject=Darbas"
                    })
                    .text($(this).val());
            } else {
                return $("<h3 />")
                    .attr({
                        class: this.className,
                        id: id
                    })
                    .text($(this).val());
            }
        });
    }
    $("body").on("click", "#dubl", function() {
        $(".kBody.kalbos>div.kRow:last-child")
            .clone()
            .insertAfter(".kBody.kalbos>div.kRow:last-child");
        refresh();
    });
    $("body").on("click", "#dubl1", function() {
        $(".kBody.pkalbos>div.kRow:last-child")
            .clone()
            .insertAfter(".kBody.pkalbos>div.kRow:last-child");
        refresh();
    });
    $("body").on("click", "#dubl2", function(e) {
        var kiekid = document.getElementsByClassName("darb").length;
        e.preventDefault();
        $("#darb")
            .clone()
            .attr({
                class: "darb",
                id: "darb" + ++kiekid
            })
            .insertAfter("#darb");
        refresh();
    });
    $("body").on("click", "#dubl3", function() {
        var kiekid = $(".prof").length;
        $("#prof")
            .clone()
            .attr({
                class: "prof",
                id: "prof" + ++kiekid
            })
            .insertAfter("#prof");
        refresh();
    });
    $("body").on("click", "#dubl4", function(e) {
        e.preventDefault();
        var divs = document.getElementsByClassName("darb").length;
        if (divs > 1) {
            $("#darb" + divs--).remove();
        }
    });
    $("body").on("click", "#dubl5", function(e) {
        e.preventDefault();
        var divs = document.getElementsByClassName("prof").length;
        if (divs > 1) {
            $("#prof" + divs--).remove();
        }
    });
    $("body").on("click", "#dubl6", function(e) {
        e.preventDefault();
        var divs = $(".kBody.kalbos>div.kRow").length;
        if (divs > 3) {
            --divs;
            $(".kBody.kalbos>div.kRow:last-child").remove();
        }
    });
    $("body").on("click", "#dubl7", function(e) {
        e.preventDefault();
        var divs = $(".kBody.pkalbos>div.kRow").length;
        if (divs > 1) {
            --divs;
            $(".kBody.pkalbos>div.kRow:last-child").remove();
        }
    });

    $("body").on("mousedown", ".percent", function(e) {
        e.preventDefault();
        if (e.button == 2) {
            var ek = $(this).attr("class");
            ef = ek.split(/[, ]+/).pop();
            $("." + ef + "").replaceWith(function() {
                return $("<input />")
                    .val($(this).text())
                    .attr({
                        autofocus: "",
                        class: ek,
                        type: "text"
                    });
            });
            $("." + ef + "").select();
            $("." + ef + "").focus();
            return false;
        }
        return true;
    });

    $("body").on("click", "h3", function(e) {
        e.preventDefault();
        if (this.id) {
            var id = this.id;
        }
        var ek = $(this).attr("class");
        ef = ek.split(/[, ]+/).pop();
        $("." + ef + "").replaceWith(function() {
            return $("<input />")
                .val($(this).text())
                .attr({
                    autofocus: "",
                    class: ek,
                    type: "text",
                    id: id
                });
        });
        $("." + ef + "").select();
        $("." + ef + "").focus();
    });
    $("body").on("dblclick", "div.kCell.edit", function(e) {
        e.preventDefault();
        var lygiai =
            '<select id="lygis"><option value="A1 – Lūžis">A1 – Lūžis (Breakthrogh)</option><option value="A2 – Pusiaukelė">A2 – Pusiaukelė (Waystage)</option><option value="B1 – Slenkstis"> B1 – Slenkstis (Threshold)</option><option value="B2 – Aukštuma">B2 – Aukštuma (Vantage)</option><option value="C1 – Efektyvus">C1 – Efektyvus (Effective Operational Proficiency)</option><option value="C2 – Meistriškas">C2 – Meistriškas (Mastery)</option></select>';
        var ek = $(this).attr("class");
        ef = ek.split(/[, ]+/).pop();
        $("." + ef + "").empty();
        if ($("." + ef + "#lygis").length == !1) {
            $("." + ef + "").append(lygiai);
            $("." + ef + "")
                .children()
                .attr("class", ek);
        }
    });

    $("body").on("click", "select", function(e) {
        var clicks = $("#lygis").data("clicks", 0);
        var wrap = $("#lygis");
        var elem = this;
        elem.addEventListener("click", function(e) {
            e.preventDefault();
            var txt = this.value;
            wrap.replaceWith(txt);
        });
    });

    $("body").on("click", "#reda", function(e) {
        e.preventDefault();
        $("#darb")
            .parent()
            .remove();
    });
    $(document).keyup(function(e) {
        if ($("input:focus") && e.keyCode === 13) {
            outf();
        }
    });
});
var iBytesUploaded = 0;
var iBytesTotal = 0;
var iPreviousBytesLoaded = 0;
var iMaxFilesize = 1048576;
var oTimer = 0;
var sResultFileSize = "";

function secondsToTime(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - hr * 3600) / 60);
    var sec = Math.floor(secs - hr * 3600 - min * 60);
    if (hr < 10) {
        hr = "0" + hr;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    if (hr) {
        hr = "00";
    }
    return hr + ":" + min + ":" + sec;
}

function bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB"];
    if (bytes == 0) return "n/a";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
}

function fileSelected() {
    document.getElementById("fileinfo").style.display = "none";
    document.getElementById("upload_response").style.display = "none";
    document.getElementById("error").style.display = "none";
    document.getElementById("error2").style.display = "none";
    document.getElementById("abort").style.display = "none";
    document.getElementById("warnsize").style.display = "none";
    var oFile = document.getElementById("image_file").files[0];
    var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
    if (!rFilter.test(oFile.type)) {
        document.getElementById("error").style.display = "block";
        return;
    }
    if (oFile.size > iMaxFilesize) {
        document.getElementById("warnsize").style.display = "block";
        return;
    }
    var oImage = document.getElementById("preview");
    var oReader = new FileReader();
    oReader.onload = function(e) {
        oImage.src = e.target.result;
        oImage.onload = function() {
            sResultFileSize = bytesToSize(oFile.size);
            document.getElementById("fileinfo").style.display = "block";
            document.getElementById("filename").innerHTML = "Name: " + oFile.name;
            document.getElementById("filesize").innerHTML =
                "Size: " + sResultFileSize;
            document.getElementById("filetype").innerHTML = "Type: " + oFile.type;
            document.getElementById("filedim").innerHTML =
                "Dimension: " + oImage.naturalWidth + " x " + oImage.naturalHeight;
        };
    };
    oReader.readAsDataURL(oFile);
}

function startUploading() {
    iPreviousBytesLoaded = 0;
    document.getElementById("upload_response").style.display = "none";
    document.getElementById("error").style.display = "none";
    document.getElementById("error2").style.display = "none";
    document.getElementById("abort").style.display = "none";
    document.getElementById("warnsize").style.display = "none";
    document.getElementById("progress_percent").innerHTML = "";
    var oProgress = document.getElementById("progress");
    oProgress.style.display = "block";
    oProgress.style.width = "0px";
    var vFD = new FormData(document.getElementById("upload_form"));
    var oXHR = new XMLHttpRequest();
    oXHR.upload.addEventListener("progress", uploadProgress, !1);
    oXHR.addEventListener("load", uploadFinish, !1);
    oXHR.addEventListener("error", uploadError, !1);
    oXHR.addEventListener("abort", uploadAbort, !1);
    oXHR.open("POST", "upload.php");
    oXHR.send(vFD);
    oTimer = setInterval(doInnerUpdates, 300);
}

function doInnerUpdates() {
    var iCB = iBytesUploaded;
    var iDiff = iCB - iPreviousBytesLoaded;
    if (iDiff == 0) return;
    iPreviousBytesLoaded = iCB;
    iDiff = iDiff * 2;
    var iBytesRem = iBytesTotal - iPreviousBytesLoaded;
    var secondsRemaining = iBytesRem / iDiff;
    var iSpeed = iDiff.toString() + "B/s";
    if (iDiff > 1024 * 1024) {
        iSpeed =
            (Math.round((iDiff * 100) / (1024 * 1024)) / 100).toString() + "MB/s";
    } else if (iDiff > 1024) {
        iSpeed = (Math.round((iDiff * 100) / 1024) / 100).toString() + "KB/s";
    }
    document.getElementById("speed").innerHTML = iSpeed;
    document.getElementById("remaining").innerHTML =
        "| " + secondsToTime(secondsRemaining);
}

function uploadProgress(e) {
    if (e.lengthComputable) {
        iBytesUploaded = e.loaded;
        iBytesTotal = e.total;
        var iPercentComplete = Math.round((e.loaded * 100) / e.total);
        var iBytesTransfered = bytesToSize(iBytesUploaded);
        document.getElementById("progress_percent").innerHTML =
            iPercentComplete.toString() + "%";
        document.getElementById("progress").style.width =
            (iPercentComplete * 4).toString() + "px";
        document.getElementById("b_transfered").innerHTML = iBytesTransfered;
        if (iPercentComplete == 100) {
            var oUploadResponse = document.getElementById("upload_response");
            oUploadResponse.innerHTML = "<h1>Please wait...processing</h1>";
            oUploadResponse.style.display = "block";
        }
    } else {
        document.getElementById("progress").innerHTML = "unable to compute";
    }
}

function uploadFinish(e) {
    var oUploadResponse = document.getElementById("upload_response");
    oUploadResponse.innerHTML = e.target.responseText;
    oUploadResponse.style.display = "block";
    document.getElementById("progress_percent").innerHTML = "100%";
    document.getElementById("progress").style.width = "400px";
    document.getElementById("filesize").innerHTML = sResultFileSize;
    document.getElementById("remaining").innerHTML = "| 00:00:00";
    clearInterval(oTimer);
}

function uploadError(e) {
    document.getElementById("error2").style.display = "block";
    clearInterval(oTimer);
}

function uploadAbort(e) {
    document.getElementById("abort").style.display = "block";
    clearInterval(oTimer);
}

function download(fileName, html) {
    var pom = document.createElement("a");
    document.body.appendChild(pom);
    pom.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(html)
    );
    pom.setAttribute("download", fileName + ".html");
    pom.target = "_blank";
    if (document.createEvent) {
        var event = document.createEvent("MouseEvents");
        event.initEvent("click", !0, !0);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}

function htmls() {
    var ceds = document
        .getElementById("vardas")
        .childNodes[0].nodeValue.replace(/\s/g, "_");
    $("button,.share,#dele,#fakebtn,#dubl,.remove,#info,#close").remove();
    $("script").remove();
    $("link")
        .last()
        .remove();
    var html = $("html").clone();
    var htmlString = html.html();
    htmlString = '<!DOCTYPE html>\n<html lang="lt">\n' + htmlString.replace(/(\r\n|\n|\r)/gm, " ") + "</html>";
    download(ceds, htmlString);
}
