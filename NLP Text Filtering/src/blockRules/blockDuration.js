export function block_duration(min_duration) {

    const videoCards = document.querySelectorAll('div.feed-card, div.bili-video-card');

    videoCards.forEach((card) => {
        const durationElement = card.querySelector('span.bili-video-card__stats__duration');
        if (durationElement != null) {
            const durationText = durationElement.innerText;
            const durationInSeconds = convertDurationToSeconds(durationText);
            if (durationInSeconds < min_duration && min_duration != 0 && durationInSeconds != 0) {
                card.style.display = 'none';
            };
        };
    });
}

function convertDurationToSeconds(durationText) {

    const parts = durationText.split(':');

    let totalSeconds = 0;

    if (parts.length === 3) {
        const hours = parseInt(parts[0]);
        const minutes = parseInt(parts[1]);
        const seconds = parseInt(parts[2]);
        totalSeconds = hours * 3600 + minutes * 60 + seconds;
    } else if (parts.length === 2) {
        const minutes = parseInt(parts[0]);
        const seconds = parseInt(parts[1]);
        totalSeconds = minutes * 60 + seconds;
    }

    return totalSeconds;
}
