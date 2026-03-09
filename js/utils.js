/* ═══════════════════════════════════════════════════════════════
   🛠️ UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════════ */

// DOM helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// Random utilities
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function range(a, b) {
    return Array.from({ length: b - a + 1 }, (_, i) => a + i);
}

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = rand(0, i);
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/* ═══════════════════════════════════════════════════════════════
   📸 MEDIA HELPERS
   ═══════════════════════════════════════════════════════════════ */

const videoExtsSet = new Set(CONFIG.videoExtensions.map(e => e.toLowerCase()));

function getExt(filename) {
    const dot = filename.lastIndexOf('.');
    return dot >= 0 ? filename.substring(dot).toLowerCase() : '';
}

function mediaPath(filename) {
    return `${CONFIG.mediaFolder}/${encodeURIComponent(filename)}`;
}

function isVideo(filename) {
    return videoExtsSet.has(getExt(filename));
}

function isUnsupported(filename) {
    const ext = getExt(filename);
    return ext === '.heic';
}

/**
 * Creates a media element (img or video) from filename
 * @param {string|object} filename - The filename of the media or object with {file, rotation}
 * @param {object} opts - Options: { className, containerStyle, lazy, muted, loop, autoplay, controls }
 * @returns {HTMLElement} - A container div with the media element
 */
function createMediaElement(filename, opts = {}) {
    // Handle both string filename and object with {file, rotation, ...}
    let actualFilename = filename;
    let rotation = 0;
    
    if (typeof filename === 'object' && filename.file) {
        actualFilename = filename.file;
        rotation = filename.rotation || 0;
    }
    
    const container = document.createElement('div');
    container.className = opts.containerClass || '';
    container.style.cssText = opts.containerStyle || '';

    if (!actualFilename || isUnsupported(actualFilename)) {
        container.innerHTML = buildPlaceholder();
        return container;
    }

    const path = mediaPath(actualFilename);
    
    // Determine rotation transform
    const rotationStyle = rotation ? `transform: rotate(${rotation}deg);` : '';
    
    if (isVideo(actualFilename)) {
        const vid = document.createElement('video');
        vid.src = path;
        vid.muted = opts.muted !== false;
        vid.loop = opts.loop !== false;
        vid.autoplay = opts.autoplay !== false;
        vid.playsInline = true;
        vid.preload = 'metadata';
        if (opts.controls) vid.controls = true;
        vid.className = opts.className || '';
        vid.style.cssText = 'width:100%;height:100%;object-fit:' + (opts.objectFit || 'cover') + ';' + rotationStyle;
        vid.onerror = () => {
            vid.remove();
            container.innerHTML = buildPlaceholder();
        };
        container.appendChild(vid);
    } else {
        const img = document.createElement('img');
        img.src = path;
        if (opts.lazy !== false) img.loading = 'lazy';
        img.alt = opts.alt || 'Memory';
        img.className = opts.className || '';
        img.style.cssText = 'width:100%;height:100%;object-fit:' + (opts.objectFit || 'cover') + ';' + rotationStyle;
        img.onerror = () => {
            img.remove();
            container.innerHTML = buildPlaceholder();
        };
        container.appendChild(img);
    }
    
    return container;
}

function buildPlaceholder() {
    return `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#fef3e2,#fce4ec);font-size:2.5rem;">📸</div>`;
}

/**
 * Get all available media files from the Pictures directory
 * This is used as fallback when MEDIA_MANIFEST sections are empty
 */
async function getAllMediaFiles() {
    // Since we can't read directory in browser, we'll use the pre-scanned list
    // You can manually update this list or use a build script
    const allFiles = [
        "AHCT6765.JPG", "AHIZ8240.JPG", "AJDN5119.JPG", "ALHX2979.JPG", "ALKC7786.JPG",
        "ALUL9827 1.JPG", "ALUL9827.JPG", "AQBT7519.JPG", "AWDS2268.JPG", "AYLJ7894.JPG",
        "BIUL5937.JPG", "BLIG4599.JPG", "BNBR9398.JPG", "BNLY5012.JPG", "BSVM8215.JPG",
        "BTKA5169.JPG", "BTQS6834.JPG", "BVYB5771.JPG", "CKKV0144.JPG", "CNFF2710.JPG",
        "CQAH2260.JPG", "CRIQ2588.JPG", "CTVX0429.JPG", "CWLI9429.JPG", "DCYL6646.WEBP",
        "DGPV9446.JPG", "DLBZ8367.JPG", "DMGE8642.JPG", "DMSM5206.JPG", "DNEV0032.JPG",
        "DNWV2884.JPG", "DSCF7977.JPG", "DSDE5789.JPG", "DSTE2475.JPG", "DTHH7058.JPG",
        "DTHO4918.JPG", "EBGG2399.JPG", "EEKV9535.JPG", "EIRA1042.JPG", "EKKH9014.JPG",
        "EOIE6591.JPG", "ETGX0599.JPG", "EUBD8112.JPG", "EXYJ3527.JPG", "EZNA4328.JPG",
        "EZOQ1016.JPG", "FBOB3357.JPG", "FGXK5682.JPG", "FODB1873.JPG", "FOIW3957.JPG",
        "FOUE6591.JPG", "FOUQ5166.JPG", "FXBW9600 1.JPG", "FXBW9600.JPG", "FYDN0553.JPG",
        "GDTB9827.JPG", "GFVR6819.JPG", "GKIK3461.JPG", "GSDQ2144.JPG", "GVMZ8378.JPG",
        "GZRY3531.JPG", "HDGI3442.JPG", "HEUD4955.JPG", "HODL4116.JPG", "HTGV7120.JPG",
        "HVNF9694.JPG", "HZVA5626.JPG", "IAPD2317.JPG", "IGEN3470.JPG", "IISW2124.JPG",
        "IKQQ1539.JPG", "ILUH4525.JPG", "ISHZ2743.JPG", "ISXG3189.JPG", "IUFX6912.JPG",
        "IVXC1358.JPG", "JAPE4520.JPG", "JEWN0921.JPG", "JGMI0318.JPG", "JHLS7248.JPG",
        "JJXA7474.JPG", "JNMZ8658.JPG", "JOYF4559.JPG", "JSZB5287.JPG", "JTDL0914.JPG",
        "JTQZ8643.JPG", "JUZG9131.JPG", "JYNP8973.JPG", "KCUM4155.JPG", "KIPG4839.JPG",
        "KOUE8479.JPG", "KPVE3434.JPG", "KQZA6289.JPG", "KSDY4866.JPG", "KSXD1638.JPG",
        "KYKC9254.JPG", "LAAV3204.JPG", "LELV5760.JPG", "LETA9818.JPG", "LFFJ9485.JPG",
        "LFVH5249.JPG", "LHGJ3432.JPG", "LSPO6315.JPG", "LUFB3048.JPG", "LWNC7912.JPG",
        "MSZZ4610.JPG", "MUDZ0855.JPG", "MWAQ6118.JPG", "MXLW8665.JPG", "NCVL8277.JPG",
        "NDBW2704.JPG", "NFSE2407.JPG", "NFVA6692.JPG", "NKUZ8795.JPG", "NLAQ8491.JPG",
        "NMJP0215.JPG", "NNCP3032.JPG", "NZCU6607.JPG", "NZSL4873.JPG", "OABB3689.JPG",
        "OAFF4346.JPG", "OCRQ5180.JPG", "ODAC1161.JPG", "OESF8273.JPG", "OGXL6035.JPG",
        "ONDT7970.JPG", "OOED7207.JPG", "OXLW4363.JPG", "OYPM7439.JPG", "PDRM3162.JPG",
        "PEPZ3658.JPG", "PKHR3319.JPG", "PKIB2973.JPG", "PLKV9333.JPG", "PNHP8830.JPG",
        "PODD2866.JPG", "PQDK5894.JPG", "PSFI5064.JPG", "PVAA3020.JPG", "PXEL1208.JPG",
        "QELH4580.JPG", "QFPW7147.JPG", "QHHU5985.JPG", "QKQH0910.JPG", "QPMN5559.JPG",
        "QTIM1299.JPG", "RAVG1953.JPG", "RDPC5131.JPG", "RDZE7845.JPG", "RLIT9114.JPG",
        "RLOW1045.JPG", "RPEX0375.JPG", "RRQX7199.JPG", "RTBS9807.JPG", "RVWF0819.JPG",
        "SAJW2442.JPG", "SBKJ9878.JPG", "SBLX1337.JPG", "SFFC4611.JPG", "SGIY5828.JPG",
        "SMKG4677.JPG", "SMNT7139.JPG", "SPHS3439.JPG", "SPQA3216.JPG", "SVHW1469.JPG",
        "SVWN2714.JPG", "SXDD2816.JPG", "SYKP7066.JPG", "SZAP0833.JPG", "TDEP0785.JPG",
        "TEUV4367.JPG", "TKBX2556.JPG", "TKRT4870.JPG", "TLLC6220.JPG", "TPMW4955.JPG",
        "TTIY5205.JPG", "TYIH8557.JPG", "UEWD5452.JPG", "ULSU8665.JPG", "UNDJ4569.JPG",
        "UNRJ6599.JPG", "UOAN3714.JPG", "USYD7689.JPG", "UUOX9658.JPG", "UUOY7917.JPG",
        "UVIR6413.JPG", "UXRO6657.JPG", "UYXN8670.JPG", "VCLC8645.JPG", "VIKB2523.JPG",
        "VLGX8631.JPG", "VTCI5166.JPG", "VVBS2004.JPG", "VVHH1335.JPG", "WXKJ3541.JPG",
        "WZOC6257.JPG", "XATZ7829.JPG", "XQSP2160.JPG", "XUBD8353.JPG", "XVOT9286.JPG",
        "YKLR2144.JPG",
        // Videos
        "ABRQ8277.MP4", "CBXR3290.MP4", "CDLO2996.MP4", "CWPN3469.MP4", "DYAV1857.MP4",
        "ENIZ2592.MP4", "ESUB0073.MP4", "GUST1737.MP4", "HGVB8791.MP4", "IMHK1320.MP4",
        "IXCD8182.MP4", "IXUF4023.MP4", "IZEE9551.MP4", "JBWX9442.MP4", "JEGZ9917.MP4",
        "KADX4840.MP4", "MHPI3906.MP4", "MLWD4874.MP4", "QTLQ3198.MP4", "RJBA0398.MP4",
        "RQVO7639.MP4", "SBKK2790.MP4", "SMUT8736.MP4", "TDHD7700.MP4", "TWFF3669.MP4",
        "UCDJ6044.MP4", "UECL4324.MP4", "UIJC1346.MP4", "VQRE7967.MP4", "VULG3389.MP4",
        "VZYW6481.MP4", "WDEZ7783.MP4", "WDOG1623.MP4", "XOIW7679.MP4", "YAEE1499.MP4",
        // GIFs
        "DEHU9721.GIF", "JPSS7522.GIF",
        // MOV
        "PXNEE7158.MOV",
        // HEIC files are skipped since browsers don't support them
        // "IMG_0308.HEIC", "IMG_0310.HEIC", "IMG_0313.HEIC", "QQCKE7897.HEIC",
    ];
    return allFiles;
}
