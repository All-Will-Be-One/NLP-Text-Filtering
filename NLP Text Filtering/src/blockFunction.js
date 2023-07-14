import $ from 'jquery';

export function prepareRegex(blacklist, blockPageTypes) {
    // Find the page info for the current URL
    let pageInfos = [];
    for (let pageType in blockPageTypes) {
        if (window.location.href.includes(blockPageTypes[pageType].urlIncludes)) {
            let pageInfo = blockPageTypes[pageType];
            pageInfo.name = pageType;
            pageInfos.push(pageInfo);
        }
    }
    let containsStrings = [];
    if (pageInfos.length > 0) {
        pageInfos.forEach(pageInfo => {
            // Filter the blacklist to get the keywords that should be active on this page
            let activeKeywords = blacklist.filter(entry => entry[pageInfo.name])
                .map(entry => entry.isRegexp ? entry.keyword : entry.keyword.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'))
                .join('|');

            if (activeKeywords) {
                containsStrings.push({
                    pageInfo: pageInfo,
                    containsString: ":containsRegex('" + activeKeywords + "')"
                });
            }
        });
    }
    return containsStrings;
}

function block_ad() {
    // Block AD
    $("svg.bili-video-card__info--ad").parents("div.bili-video-card").hide();
    $("svg.bili-video-card__info--ad").parents("div.feed-card").hide();
    $("div.video-page-special-card-small").hide();
}

export function block_blacklist(prepArray) {
    block_ad();

    if (prepArray.length > 0) {
        prepArray.forEach(prep => {
            //console.log(prep.pageInfo.name)

            // Now hide all matching elements on the page
            prep.pageInfo.matchPairs.forEach(pair => {
                $(pair.matchSelector + prep.containsString).parents(pair.parentSelector).hide();
            });

            // Apply CSS modifications
            if (prep.pageInfo.cssModifications) {
                $('<style>').prop('type', 'text/css').html(prep.pageInfo.cssModifications).appendTo('head');
            }
        });
    }
}