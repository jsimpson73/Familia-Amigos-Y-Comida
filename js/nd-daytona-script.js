function initDomainSpecificContent() {
    const hostname = window.location.hostname;
    const baseUrl = 'https://sites.super.myninja.ai';
    const bannerName = 'ninja-daytona-banner';
    const footerName = 'ninja-badge';

    function createBanner() {
        // Ensure body exists
        if (!document.body) {
            setTimeout(createBanner, 100);
            return;
        }

        const banner = document.createElement('div');
        fetch(`${baseUrl}/_assets/${bannerName}.html`)
        .then(response => response.text())
        .then(html => {
            banner.innerHTML = html;
            document.body.appendChild(banner);
            const ninjaBanner = document.getElementById(bannerName);
            if (!ninjaBanner) return;
            document.body.style.paddingTop = '40px';
        })
        .catch(error => {
            console.error('Error fetching banner content:', error);
        });
    }

    function createFooter() {
        // Ensure body exists
        if (!document.body) {
            setTimeout(createFooter, 100);
            return;
        }

        const footer = document.createElement('div');
        fetch(`${baseUrl}/_assets/${footerName}.html`)
        .then(response => response.text())
        .then(html => {
            footer.innerHTML = html;
            document.body.appendChild(footer);
        })
        .catch(error => {
            console.error('Error fetching footer content:', error);
        });
    }

    // Check domain and inject appropriate element
    if (hostname.includes('daytona.work')) {
        createBanner();
    } else if (hostname.includes('myninja.ai')) {
        createFooter();
    }
}

// Wait for DOM to be ready with multiple fallbacks
function ensureDOMReady() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDomainSpecificContent);
    } else if (document.readyState === 'interactive' || document.readyState === 'complete') {
        // DOM is ready, but give it a small delay to ensure body is available
        setTimeout(initDomainSpecificContent, 10);
    } else {
        // Fallback: try immediately and retry if needed
        initDomainSpecificContent();
    }
}

// Start the process
ensureDOMReady();