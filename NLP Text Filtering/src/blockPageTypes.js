export const blockPageTypes = {
    searchPage: {
        urlIncludes: 'search.bilibili.com',
        matchPairs: [
            { matchSelector: "div.bili-video-card__info--right", parentSelector: 'div.col_3' },
            { matchSelector: "div.media-card-content", parentSelector: "div.media-card" },
        ],
        cssModifications: {}
    },
    mainPage: {
        urlIncludes: 'www.bilibili.com',
        matchPairs: [
            { matchSelector: "div.bili-video-card__info--right", parentSelector: "div.bili-video-card" },
            { matchSelector: "div.bili-video-card__info--right", parentSelector: "div.feed-card" },
            { matchSelector: "div.bili-video-card__info--right", parentSelector: "div.floor-single-card" },
        ],
        cssModifications: '.recommended-container_floor-aside .container>*:nth-of-type(n + 8) {margin-top: 0px !important;}'
    },
    leaderboard: {
        urlIncludes: 'www.bilibili.com/v/popular',
        matchPairs: [
            { matchSelector: "div.video-card__info", parentSelector: "div.video-card" },
        ],
    },
    timeLine: {
        urlIncludes: 't.bilibili.com',
        matchPairs: [
            { matchSelector: "div.bili-dyn-content", parentSelector: "div.bili-dyn-list__item" },
        ],
    },
    recommand: {
        urlIncludes: 'www.bilibili.com/video/BV',
        matchPairs: [
            { matchSelector: "div.info", parentSelector: "div.video-page-card-small" },
        ],
    },
    reply: {
        urlIncludes: 'www.bilibili.com/video/BV',
        matchPairs: [
            { matchSelector: "div.root-reply", parentSelector: "div.content-warp" },
            { matchSelector: "span.reply-content-container.sub-reply-content", parentSelector: "div.sub-reply-item" },
        ],
    },
};

export const pageTypes = [
    'searchPage',
    'mainPage',
    'leaderboard',
    'timeLine',
    'recommand',
    'reply'
];

export const pageTypesCN = {
    searchPage: '搜索页面',
    mainPage: '主页面',
    leaderboard: '排行榜',
    timeLine: '动态',
    recommand: '推荐',
    reply: '回复'
};