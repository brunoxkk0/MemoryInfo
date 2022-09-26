window.addEventListener('DOMContentLoaded', () => {

    const root = document.querySelector(':root');

    const element = document.getElementsByClassName("sys-info")[0]
    const originalText = element.innerHTML;

    const memPercentage = document.getElementsByClassName("mem-percentage")[0];

    const timer = setInterval(() => {

        let text = originalText;

        const {total, free} = process.getSystemMemoryInfo()

        text = text.replaceAll("${totalRam}",   memFormat(total / 1024))
        text = text.replaceAll("${freeRam}",    memFormat(free / 1024))
        text = text.replaceAll("${usedRam}",    memFormat((total - free) / 1024))

        element.innerHTML = text

        root.style.setProperty("--progress-bar", `${(free * 100 / total).toFixed(0)}%`)
        memPercentage.innerHTML = `${(free * 100 / total).toFixed(0)}%`

    }, 500)
})

const memFormat = (mem) => {
    return `${Math.round(mem).toLocaleString()} MB`
}

