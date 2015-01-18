$(window).ready(function(){var e="http://search.cocoapods.org",t=e+"/api/v1/pods.picky.hash.json",n=e+"/no_results.json",i=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),s=$('#search input[type="search"]'),o=$("#search fieldset p"),u=/\b(platform|on\:\w+\s?)+/,a=$("#search_results div.platform"),f=$("#search_results div.allocations"),l=$("#results_container"),c=function(e,t){var n=e.total;n>0?_gaq.push(["_trackEvent","search","with results",t,n]):_gaq.push(["_trackEvent","search","not found",t,0])},h=function(){_gaq.push(["_trackEvent","platform","switch platform",a.find("input:checked").val(),1])},p=function(e,t){_gaq.push(["_trackEvent","allocation","filter categories",e,t])},d=function(e){_gaq.push(["_trackEvent","resultlink","click outbound link",e,1])},v=function(){a.find("label").removeClass("selected"),a.find("input:checked + label").addClass("selected")},m=!1,g=function(){m||($("html, body").animate({scrollTop:s.offset().top},300),l.addClass("active"),o.hide(),m=!0)},y=function(){m&&($("html, body").animate({scrollTop:0},300),l.removeClass("active"),o.show(),m=!1)},b=function(){y(),$("#search span.amount").hide(),$("#search span#search_loupe").show(),a.hide(),f.hide(),$("#search_results div.results").hide()},w=function(){g(),$("#search span.amount").show(),$("#search span#search_loupe").hide()},E=function(){a.show(),f.show()},S=function(e){return e.replace(u,"")},x=function(e){a.show(),f.hide(),$.getJSON(n,"query="+S(e),function(e,t,n){var r=e.split[0].join(" "),i=e.split[1],s=$("#results_container .no_results .splits");r&&i>0?s.html("<p>We found "+i+" results searching for <a href='javascript:pickyClient.insert(\""+r+"\");'>"+r+"</a>.</p>"):s.html("");var o=$("#results_container .no_results .tags"),u=[];$.each(e.tag,function(e,t){u.push("<a href='javascript:pickyClient.insert(\"tag:"+e+"\");'>"+e+"</a>")}),o.html("<p>Maybe it helps exploring via one of our keywords? </p>"),o.find("p").append(u.sort().join(", ")).append(".")})},T=function(e){e=$(e),e.addClass("loading"),$.ajax({url:"/pod/"+e.data("pod-name")+"/inline",dataType:"html"}).done(function(t){e.addClass("is-expanded"),e.removeClass("loading"),$(e,".expanded .content")[0].innerHTML=t}).fail(function(){r,e.removeClass("loading")})},N={ios:"iOS",osx:"OS X"},C=/^http/,k=function(e){var t,n,r=e.source;for(var i in r){if(i=="http")return"";n=r[i];if(n.toString().match(C)){t=n;break}}return t},L=function(e){e.platform=N[e.platforms],e.docs_link=e.documentation_url||"http://cocoadocs.org/docsets/"+e.id+"/"+e.version,e.site_link=e.link||k(e),e.spec_link="https://github.com/CocoaPods/Specs/tree/master/Specs/"+e.id+"/"+e.version+"/"+e.id+".podspec.json";if(e.version.match(/[^.0-9]/))e.clipboard_version=e.version;else{var t=e.version.split(".").slice(0,2).join(".");e.clipboard_version="~> "+t}return e.deprecated_in_favor_of?e.deprecated_in_favor_of_link="http://cocoapods.org?q="+e.deprecated_in_favor_of:e.deprecated_in_favor_of_link="",ich.search_result(e,!0)},A=[],O=function(e){return A[A.length-1]!=e?(A.push(e),!0):!1},M=function(e){if(A.indexOf(e)>=0){while(e.length>0){query=A.shift();if(query==e)return!1}return!0}return!0};pickyClient=new PickyClient({full:t,fullResults:20,live:t,liveResults:20,liveRendered:!0,liveSearchInterval:166,maxSuggestions:5,alwaysShowResults:!0,alwaysShowSelection:!0,wrapResults:'<ol class="results"></ol>',enclosingSelector:"#search",resultsSelector:"#search_results div.results",noResultsSelector:"#results_container .no_results",allocationsSelector:"#search_results div.allocations",hiddenAllocations:"#search_results div.allocations .onrequest",counterSelector:"#search form span.amount",moreSelector:"#search_results .allocations .more",beforeInsert:function(e){if(""!=e){w();var t=e.match(u);if(t){var n=a.find('input[value="'+t[0].replace(/\s+$/g,"")+'"]');n.attr("checked","checked"),a.find("label").removeClass("selected"),a.find("input:checked + label").addClass("selected")}return S(e)}},beforeParams:function(e){return e.sort="popularity",e},before:function(e,t){if(e=="")return"";e=e.replace(u,"");var n=a.find("input:checked").val();n!==undefined&&n!=""&&(e=n+" "+e);if(!O(e))return;return e},success:function(e,t){c(e,t);if(""==s.val())return b(),!1;if(M(t))return!1;0==e.total?x(t):E();var n=e.allocations;return n.each(function(e,t){t.entries=t.entries.map(function(e,t){return L(t)})}),e},after:function(e){$copy_to_clipboard=$("ol.results img.copy");var t=new ZeroClipboard($copy_to_clipboard,{moviePath:"./flashes/ZeroClipboard.swf",forceHandCursor:!0});t.on("noflash",function(e,t){function n(e){setTimeout(function(){!$(e).is(":hover")&&!$(".popover:hover").length?$(e).popover("hide"):n(e)},500)}$copy_to_clipboard.popover({trigger:"manual",container:"body"}).on("click",function(e){e.preventDefault()}).on("mouseenter",function(){$(this).popover("show"),$(".popover input").select()}).on("mouseleave",function(){n(this)})}),t.on("load",function(e){e.on("complete",function(e,t){$("h4.has-flash").text("Saved to clipboard"),$(".popover").addClass("saved")}),t.on("mouseover",function(e,t){$(this).popover("show")}),t.on("mouseout",function(e,t){$(this).popover("hide")})}),f.find("li").on("click",function(e){var t=$(e.currentTarget);p(t.find(".text").text(),t.find(".count").text())}),$("ol.results").find("a").on("click",function(e){d(e.currentTarget.href)}),$("ol.results li").on("click",function(e){var t=$(e.target);return t.is("li.result")==0&&(t=$(e.target).parents("li")),T(t),e.stopPropagation(),!1})},qualifiers:{en:{dependencies:"uses",platform:"on"}},groups:[["platform"]],choices:{en:{platform:"",name:"name",author:"author",summary:"summary",dependencies:"dependency",tags:"tag",version:"version",subspecs:"subspec","author,name":"author+name","name,author":"name+author","tags,name":"tag+name","name,tags":"name+tag","version,name":"version+name","name,version":"name+version","name,dependencies":"name+dependency","dependencies,name":"dependency+name","author,dependencies":"author+dependency","dependencies,author":"dependency+author","dependencies,version":"dependency+version","version,dependencies":"version+dependency","author,version":"author+version","version,author":"version+author","summary,version":"summary+version","version,summary":"version+summary","tags,summary":"summary+name","summary,tags":"name+summary","summary,name":"summary+name","name,summary":"name+summary","summary,author":"summary+author","author,summary":"author+summary","summary,dependencies":"summary+dependency","dependencies,summary":"dependency+summary","name,subspecs":"name+subspec","subspecs,name":"subspec+name","dependencies,subspecs":"dependency+subspec","subspecs,dependencies":"subspec+dependency"}},explanations:{en:{author:"written by",versions:"on version",dependencies:"using",name:"named",summary:"with summary",tags:"tagged as",subspecs:"with subspec"}},explanationDelimiter:{en:"and"},explanationTokenCallback:function(e,t){if(e=="platform"){var n=t.length;return n==2?"<strong>on</strong> both "+t.join(" & "):"only <strong>on</strong> "+t[0]}}}),s.on("input",function(e){""==this.value?(_gaq.push(["_trackEvent","clear"]),b()):w()}),a.find("input").bind("change",function(e){h(),pickyClient.resend(),v()}),$("#search_container").on("click",function(e){s.focus()});var _=function(e){return e.next()},D=function(e){return e.prev()},P=function(e){var t=$("ol.results li.result"),n=t.closest(".selected").first();n.length>0?(n.removeClass("selected"),n=e(n)):n=t.first(),n.addClass("selected")},H=function(){var e=$("ol.results li.result.selected").first();e.length>0&&T(e)};$("body").keydown(function(e){switch(e.keyCode){case 40:P(_);break;case 38:P(D);break;case 13:i&&s.blur(),H()}}),window.initial_query!=""&&pickyClient.insertFromURL(window.initial_query)});