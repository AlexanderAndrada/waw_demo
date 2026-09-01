const createOpenButton = () => {
    const wawOpenButton = document.createElement('button');
    wawOpenButton.id = 'open-button';
    wawOpenButton.className = 'waw-button';
    wawOpenButton.setAttribute('aria-label', 'Abrir el widget de accesibilidad');
    wawOpenButton.setAttribute('aria-controls', 'waw-widget');
    wawOpenButton.setAttribute('aria-expanded', 'false');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#icon-accesibility');

    svg.appendChild(use);
    wawOpenButton.appendChild(svg);

    return wawOpenButton;
};

const createSVG = (href, extraClass = '') => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    if (extraClass) svg.classList.add(extraClass);
    svg.setAttribute('aria-hidden', 'true');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', href);

    svg.appendChild(use);
    return svg;
};

const createButton = ({ id, className, ariaLabel, text, dataset = {}, children = [] }) => {
    const btn = document.createElement('button');
    if (id) btn.id = id;
    if (className) btn.className = className;
    if (ariaLabel) btn.setAttribute('aria-label', ariaLabel);
    if (text) btn.textContent = text; 

    Object.entries(dataset).forEach(([key, value]) => {
        btn.dataset[key] = value;
    });

    children.forEach(child => btn.appendChild(child));
    return btn;
};

const createHeader = () => {
    const header = document.createElement('header');
    header.className = 'waw__header';

    const h2 = document.createElement('h2');
    h2.id = 'waw-title';
    h2.textContent = 'Ajustes de accesibilidad';

    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'header-options';

    const btnTheme = createButton({
        className: 'header-options__button header-options__button--small',
        ariaLabel: 'Activar tema oscuro',
        dataset: { wawFunction: 'toggle-theme' },
        children: [
            createSVG('#icon-light', 'light'),
            createSVG('#icon-dark', 'dark')
        ]
    });

    const btnReset = createButton({
        className: 'header-options__button header-options__button--small',
        ariaLabel: 'Restablecer ajustes',
        dataset: { wawFunction: 'reset' },
        children: [createSVG('#icon-reset')]
    });

    const btnClose = createButton({
        id: 'close-button',
        className: 'header-options__button',
        ariaLabel: 'Cerrar widget',
        children: [createSVG('#icon-close')]
    });

    optionsDiv.append(btnTheme, btnReset, btnClose);
    header.append(h2, optionsDiv);
    return header;
};

// ---------- SECCIÓN "CONFIGURACIÓN" ----------

// Subgrupos de valores
const createValueGroup = (titleText) => {
    const div = document.createElement('div');
    div.className = 'setting__value';
    const h4 = document.createElement('h4');
    h4.textContent = titleText;
    div.appendChild(h4);
    return div;
};

const createRadioLabel = (text, name, id, value, checked = false, className = 'setting__label') => {
    const label = document.createElement('label');
    label.htmlFor = id;
    label.className = className;
    label.textContent = text;

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = name;
    input.id = id;
    input.value = value;
    if (checked) input.checked = true;

    label.appendChild(input);
    return label;
};


const createSettingsSection = () => {
    const details = document.createElement('details');
    details.className = 'accordion setting';
    details.open = true;

    // Summary
    const summary = document.createElement('summary');
    summary.className = 'accordion__head';
    summary.textContent = 'Configuración';
    summary.appendChild(createSVG('#icon-arrow'));
    details.appendChild(summary);

    // Body
    const body = document.createElement('div');
    body.className = 'accordion__body';

    // ----- ITEM: Posición del widget -----
    const itemWidgetPosition = document.createElement('div');
    itemWidgetPosition.className = 'setting__item';

    const titleWidget = document.createElement('div');
    titleWidget.className = 'setting__tittle';
    const h3Widget = document.createElement('h3');
    h3Widget.textContent = 'Posicion del widget';
    titleWidget.appendChild(h3Widget);
    itemWidgetPosition.appendChild(titleWidget);

    itemWidgetPosition.append(
        createRadioLabel('Izquierda', 'waw-widget-position', 'widget-pos-left', 'left'),
        createRadioLabel('Derecha', 'waw-widget-position', 'widget-pos-right', 'right', true)
    );

    // ----- ITEM: Guía de lectura -----
    const itemReadingLine = document.createElement('div');
    itemReadingLine.className = 'setting__item';

    const titleLine = document.createElement('div');
    titleLine.className = 'setting__tittle';
    const h3Line = document.createElement('h3');
    h3Line.textContent = 'Guia de Lectura';
    titleLine.appendChild(h3Line);
    itemReadingLine.appendChild(titleLine);

    // Opacidad (línea)
    const groupOpacity = createValueGroup('Opacidad');
    groupOpacity.append(
        createRadioLabel('Nula', 'waw-line-opacity', 'line-opacity-null', '0'),
        createRadioLabel('Baja', 'waw-line-opacity', 'line-opacity-low', '0.4'),
        createRadioLabel('Media', 'waw-line-opacity', 'line-opacity-medium', '0.6', true),
        createRadioLabel('Alta', 'waw-line-opacity', 'line-opacity-high', '0.8')
    );

    // Grosor (línea)
    const groupWeight = createValueGroup('Grosor');
    groupWeight.append(
        createRadioLabel('Pequeño', 'waw-line-weight', 'mask-weight-low', '4'),
        createRadioLabel('Mediano', 'waw-line-weight', 'mask-weight-medium', '10', true),
        createRadioLabel('Grande', 'waw-line-weight', 'mask-weight-high', '20')
    );

    // Colores (línea)
    const groupColor = createValueGroup('Color');
    const colors = [
        ['green', '#1cbe00', true],
        ['yellow', '#ffea00'],
        ['red', '#f80000'],
        ['blue', '#2323ff'],
        ['white', '#ffffff'],
        ['black', '#000000']
    ];

    colors.forEach(([name, value, checked]) => {
        const label = document.createElement('label');
        label.className = `box-color box-color--${name}`;
        label.htmlFor = `box-color-${name}`;
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'waw-line-color';
        input.id = `box-color-${name}`;
        input.value = value;
        if (checked) input.checked = true;
        label.appendChild(input);
        groupColor.appendChild(label);
    });

    itemReadingLine.append(groupOpacity, groupWeight, groupColor);

    // ----- ITEM: Máscara de lectura -----
    const itemMask = document.createElement('div');
    itemMask.className = 'setting__item';

    const titleMask = document.createElement('div');
    titleMask.className = 'setting__tittle';
    const h3Mask = document.createElement('h3');
    h3Mask.textContent = 'Mascara de Lectura';
    titleMask.appendChild(h3Mask);
    itemMask.appendChild(titleMask);

    // Opacidad máscara
    const groupMaskOpacity = createValueGroup('Opacidad');
    groupMaskOpacity.append(
        createRadioLabel('Baja', 'waw-mask-opacity', 'mask-opacity-low', '0.4'),
        createRadioLabel('Media', 'waw-mask-opacity', 'mask-opacity-medium', '0.7', true),
        createRadioLabel('Alta', 'waw-mask-opacity', 'mask-opacity-high', '0.8')
    );

    // Altura máscara
    const groupMaskHeight = createValueGroup('Altura');
    groupMaskHeight.append(
        createRadioLabel('Pequeña', 'waw-mask-height', 'mask-height-small', '60'),
        createRadioLabel('Mediana', 'waw-mask-height', 'mask-height-medium', '100', true),
        createRadioLabel('Grande', 'waw-mask-height', 'mask-height-large', '150'),
        createRadioLabel('Extra Grande', 'waw-mask-height', 'mask-height-xlarge', '200')
    );

    itemMask.append(groupMaskOpacity, groupMaskHeight);

    // ----- ITEM: Lector de pantalla -----
    const itemScreenReader = document.createElement('div');
    itemScreenReader.className = 'setting__item';

    const titleReader = document.createElement('div');
    titleReader.className = 'setting__tittle';
    const h3Reader = document.createElement('h3');
    h3Reader.textContent = 'Lector de Pantalla';
    titleReader.appendChild(h3Reader);
    itemScreenReader.appendChild(titleReader);

    // Voces
    const groupVoice = createValueGroup('Voz');
    const select = document.createElement('select');
    select.id = 'voices-list';
    groupVoice.appendChild(select);

    // Velocidad
    const groupVelocity = createValueGroup('Velocidad');
    groupVelocity.append(
        createRadioLabel('Lento', 'waw-screenreader-velocity', 'velocity-low', '0.5'),
        createRadioLabel('Normal', 'waw-screenreader-velocity', 'velocity-normal', '1', true),
        createRadioLabel('Medio', 'waw-screenreader-velocity', 'velocity-medium', '1.2'),
        createRadioLabel('Rápido', 'waw-screenreader-velocity', 'velocity-high', '1.5')
    );

    // Botón probar
    const btnPlay = createButton({
        id: 'test-voicereading',
        className: 'button-play',
        text: 'Probar',
        children: [createSVG('#icon-play')]
    });

    itemScreenReader.append(groupVoice, groupVelocity, btnPlay);

    // Armar cuerpo del details
    body.append(itemWidgetPosition, itemReadingLine, itemMask, itemScreenReader);
    details.appendChild(body);

    return details;
};

const createAboutSection = () => {
    const details = document.createElement('details');
    details.className = 'accordion about';

    const summary = document.createElement('summary');
    summary.className = 'accordion__head';
    summary.textContent = 'Acerca de';
    summary.appendChild(createSVG('#icon-arrow'));
    details.appendChild(summary);

    const body = document.createElement('div');
    body.className = 'accordion__body';

    const createAboutItem = (title, content) => {
        const div = document.createElement('div');
        div.className = 'about__item';
        const h3 = document.createElement('h3');
        h3.textContent = title;
        div.appendChild(h3);
        if (Array.isArray(content)) {
            const ul = document.createElement('ul');
            ul.className = 'about__list';
            content.forEach(name => {
                const li = document.createElement('li');
                li.textContent = name;
                ul.appendChild(li);
            });
            div.appendChild(ul);
        } else if (typeof content === 'string') {
            const p = document.createElement('p');
            p.textContent = content;
            div.appendChild(p);
        } else {
            div.append(...content);
        }
        return div;
    };
    
    const aboutLinks = document.createElement('div');
    aboutLinks.className = 'about__item';

    const linkGit = document.createElement('a');
    linkGit.className = 'about__link';
    linkGit.setAttribute('aria-label', 'Repositorio en github');
    linkGit.href = 'https://github.com/erme07/waw';
    linkGit.appendChild(createSVG('#icon-github'));
    aboutLinks.appendChild(linkGit);

    const linkNpm = document.createElement('a');
    linkNpm.className = 'about__link';
    linkNpm.setAttribute('aria-label', 'Paquete en npm');
    linkNpm.href = 'https://www.npmjs.com/package/waw-widget';
    linkNpm.appendChild(createSVG('#icon-npm'));

    aboutLinks.appendChild(linkNpm);

    body.append(
        createAboutItem('Proyecto', 'Widget de Accesibilidad Web (WAW)'),
        createAboutItem('Institución', 'Universidad Nacional del Oeste (UNO)'),
        createAboutItem('Responsables', [
            'Pandolfo Pablo',
            'Andrada Alexander Alexis',
            'Elisey Larco Agustin',
            'Ramirez Walter',
            'Medina Erik',
            'Lobo Santiago',
            'Guzman Alexis',
            'Ruiz Abril'
        ]),
        aboutLinks
    );

    details.appendChild(body);
    return details;
};

const createOption = (id, iconHref, label, options = {}) => {
    const { progressItems = 0, progressId = '' } = options;
    const button = document.createElement('button');
    button.id = id;
    button.className = `opcion opcion--${id.replace('btn-', '')}`;

    const svgIcon = createSVG(iconHref, 'opcion__icono');
    const status = document.createElement('span');
    status.className = 'opcion__status';
    status.appendChild(createSVG('#icon-check'));

    const name = document.createElement('span');
    name.className = 'opcion__nombre';
    name.textContent = label;

    let progressSection = null;
    if (progressItems > 0) {
        progressSection = document.createElement('div');
        progressSection.className = 'progress';
        if (progressId) progressSection.id = progressId;

        for (let i = 0; i < progressItems; i++) {
            const item = document.createElement('span');
            item.className = 'progress__item';
            progressSection.appendChild(item);
        }
    }

    if (progressSection)
        button.append(svgIcon, status, name, progressSection);
    else 
        button.append(svgIcon, status, name);
    return button;
};

const createBody = () => {
    const section = document.createElement('section');
    section.className = 'waw__body';

    const grid = document.createElement('div');
    grid.className = 'grid';

    const span = document.createElement('span');
    span.textContent = 'Restablecer Ajustes';
    span.className = 'opcion__nombre';
    const btnReset = createButton({
        className: 'opcion opcion--reset',
        dataset: { wawFunction: 'reset' },
        children: [span ,createSVG('#icon-reset')]
    });

    grid.append(
        createOption('btn-fontsize', '#text', 'Tamaño del Texto', { progressItems: 5, progressId: 'fontsize-levels' }),
        createOption('btn-lineheight', '#lineheight', 'Altura de Línea', { progressItems: 4, progressId: 'lineheight-levels' }),
        createOption('btn-letterspacing', '#letterSpacing', 'Espaciado de Texto', { progressItems: 4, progressId: 'letterSpacing-levels' }),
        createOption('btn-color-invert', '#inverted', 'Invertir Colores'),
        createOption('btn-greyscale', '#greyscale', 'Escala de Grises'),
        createOption('btn-big-cursor', '#cursor', 'Cursor Grande'),
        createOption('btn-reading-line', '#line', 'Guía de Lectura'),
        createOption('btn-reading-mask', '#mask', 'Máscara de Lectura'),
        createOption('btn-voice-reading', '#voice', 'Lector de Pantalla'),
        createOption('btn-hide-img', '#noimage', 'Ocultar Imágenes'),
        createOption('btn-highlight-links', '#links', 'Resaltar Enlaces'),
        createOption('btn-highlight-headers', '#headers', 'Resaltar Encabezados'),
        createOption('btn-apto-dislexia', '#dyslexia', 'Apto Para Dislexia'),
        createOption('btn-animations', '#stopAnimation', 'Detener Animaciones'),
        createOption('btn-mute-sound', '#mute', 'Silenciar Sonidos'),
        btnReset
    );
    section.append(grid);
    section.append(createSettingsSection());
    section.append(createAboutSection());

    return section;
};

const createFooter = () => {
    const footer = document.createElement('footer');
    footer.className = 'waw__footer';

    const logo = createSVG('#logo');
    const p = document.createElement('p');
    p.textContent = 'Widget de Accesibilidad Web';

    footer.append(logo, p);
    return footer;
};

function createWidget() {
    const waw = document.createElement('aside');
    waw.id = 'waw-widget';
    waw.className = 'waw';
    waw.setAttribute('aria-labelledby', 'waw-title');
    waw.setAttribute('inert', '');

    waw.append(
        createHeader(),
        createBody(),
        createFooter()
    );

    return waw;
}

const createMuteIndicator = () => {
    const wawMuteIndicator = document.createElement('div');
    wawMuteIndicator.className = 'waw-mute-indicator';
    wawMuteIndicator.id = 'waw-mute-indicator';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#mute');

    svg.appendChild(use);
    wawMuteIndicator.appendChild(svg);

    return wawMuteIndicator;
};

const createReadingMask = () => {

    const wawReadingMask = document.createElement('div');
    wawReadingMask.id = 'waw-reading-mask';
    wawReadingMask.className = 'waw-reading-mask hidden';

    const readingMaskTop = document.createElement('div');
    readingMaskTop.id = 'waw-reading-mask__top';
    readingMaskTop.className = 'waw-reading-mask__top';
    wawReadingMask.appendChild(readingMaskTop);

    const readingMaskMiddle = document.createElement('div');
    readingMaskMiddle.id = 'waw-reading-mask__middle';
    readingMaskMiddle.className = 'waw-reading-mask__middle';

    const controls = document.createElement('div');
    controls.className = 'reading-controls desktop';
    controls.id = 'reading-controls-mask';
    controls.appendChild(document.createElement('span'));

    const makeIconButton = (id, title, iconHref) => {
        const btn = document.createElement('button');
        btn.id = id;
        btn.className = 'reading-controls__button';
        btn.title = title;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        
        use.setAttribute('href', iconHref);
        svg.appendChild(use);
        btn.appendChild(svg);
        return btn;
    };

    controls.appendChild(makeIconButton('btn-plus-mask', 'Aumentar tamaño de la máscara', '#icon-plus'));
    controls.appendChild(makeIconButton('btn-minus-mask', 'Disminuir tamaño de la máscara', '#icon-minus'));
    controls.appendChild(makeIconButton('btn-close-mask', 'Cerrar máscara de lectura', '#icon-close-circle'));

    readingMaskMiddle.appendChild(controls);
    wawReadingMask.appendChild(readingMaskMiddle);

    const readingMaskBottom = document.createElement('div');
    readingMaskBottom.className = 'waw-reading-mask__bottom';
    wawReadingMask.appendChild(readingMaskBottom);

    return wawReadingMask;
};

const createReadingLine = () => {
    // Crear el contenedor principal
    const wawReadingLine = document.createElement('div');
    wawReadingLine.id = 'waw-reading-line';
    wawReadingLine.className = 'waw-reading-line hidden';
    wawReadingLine.setAttribute('role', 'region');
    wawReadingLine.setAttribute('aria-label', 'Guía de lectura en pantalla');
    wawReadingLine.setAttribute('aria-hidden', 'true');

    // Crear el contenedor interno de controles
    const readingControls = document.createElement('div');
    readingControls.className = 'reading-controls reading-controls--line';
    readingControls.id = 'reading-controls-line';

    // Crear el span que actúa como botón
    const spanButton = document.createElement('span');
    spanButton.setAttribute('role', 'button');
    spanButton.setAttribute('tabindex', '0');
    spanButton.setAttribute('aria-label', 'Mostrar controles de lectura');

    // Crear el botón de cerrar
    const closeButton = document.createElement('button');
    closeButton.id = 'btn-close-line';
    closeButton.className = 'reading-controls__button';
    closeButton.setAttribute('aria-label', 'Cerrar guía de lectura');
    closeButton.setAttribute('title', 'Cerrar guía de lectura');

    // Crear el SVG dentro del botón
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '#icon-close-circle');

    // Armar la estructura SVG
    svg.appendChild(use);
    closeButton.appendChild(svg);

    // Armar la jerarquía DOM completa
    readingControls.appendChild(spanButton);
    readingControls.appendChild(closeButton);
    wawReadingLine.appendChild(readingControls);

    return wawReadingLine;
};

function builWidget() {
    const fragment = document.createDocumentFragment();

    fragment.append(
        createOpenButton(),
        createWidget(),
        createMuteIndicator(),
        createReadingMask(),
        createReadingLine()
    );

    document.body.appendChild(fragment);
}

let excludeSelector = '.waw';
const blacklist = new Set(['SCRIPT','STYLE','NOSCRIPT','IFRAME','CANVAS','SVG']);

const isVisibleText = (el) => {
        const s = getComputedStyle(el);
        if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) === 0 || el.offsetParent == null) return false;
        const r = el.getBoundingClientRect();
        return !(r.width === 0 && r.height === 0);
    };

const hasTextNode = (el) => {
    for (const node of el.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) return true;
    }
    return false;
};

let letterSpacingtargets=[];
const letterSpacinglevels = {
    0: { letter: 2.0, word: 3.0 },
    1: { letter: 3.0, word: 4.0 }, 
    2: { letter: 5.0, word: 6.0 }, 
    3: { letter: 8.0, word: 8.0 } 
};

let lineHeightTargets=[];
const lineHeightLevels = {
    0: 0.8, 
    1: 1.2,
    2: 1.6,
    3: 2.0
};

let fontSizeTargets=[];
const fontSizeLevels = {
    0: 0.8,  // reducido
    1: 0.9,  // normal
    2: 1.1,  // aumentado
    3: 1.3,   // muy aumentado
    4: 1.6   // muy aumentado
};

class FontSize{
    constructor(){
        this.$btn = null;
    }

    init(){
        this.$btn = document.getElementById('btn-fontsize');
    }

    #selectTargets(){
        let targets = Array.from(document.querySelectorAll('*')).filter(el => {
            if (blacklist.has(el.tagName)) return false;
            if (el.closest(excludeSelector)) return false;
            if (!isVisibleText(el)) return false
            if (!hasTextNode(el)) return false
            const style = getComputedStyle(el);
            const fs = parseFloat(style.fontSize);
            const base = isNaN(fs) ? 16 : fs; // si es 'normal', lo tratamos como 0
            el.dataset.fontSize = base;
            return true
        });
        fontSizeTargets.length = 0;
        fontSizeTargets.push(...targets);
    }

    setLevel(){
        if(states.text_size === false) {
            states.text_size = 0;
            this.activate();
        }
        else if(states.text_size +1 < 5){
            states.text_size += 1;
            this.#setFontSize();
        }
        else this.deactivate();
    }

    #setFontSize(){
        fontSizeTargets.forEach(el => {
            const base = el.dataset.fontSize;
            const newSize = base * fontSizeLevels[states.text_size];
            el.style.fontSize = `${newSize}px`;
        });
        const $level_indicator = document.getElementById("fontsize-levels");
        Array.from($level_indicator.children).forEach(item => item.classList.remove("active"));
        $level_indicator.children[states.text_size].classList.add("active");
    }

    activate(){
        this.#selectTargets();
        this.#setFontSize();
        this.$btn.classList.add('active');
    }

    deactivate(){
        Array.from(document.querySelectorAll("[data-font-size]")).forEach(el=>{
            el.style.removeProperty("font-size");
            delete el.dataset.fontSize;
        });
        fontSizeTargets.length = 0;
        this.$btn.classList.remove('active');
        states.text_size = false;
        const $level_indicator = document.getElementById("fontsize-levels");
        Array.from($level_indicator.children).forEach(item => item.classList.remove("active"));
    }
}

const fontSize = new FontSize();

class LineHeightSpacing{
    constructor(){
        this.$btn = null;
        this.$level_indicator = null;
    }

    init(){
        this.$btn = document.getElementById('btn-lineheight');
        this.$level_indicator = document.getElementById("lineheight-levels");
    }

    #selectTargets(){
        let targets = Array.from(document.querySelectorAll('*')).filter(el => {
            if (blacklist.has(el.tagName)) return false;
            if (el.closest(excludeSelector)) return false;
            if (!isVisibleText(el)) return false
            if (!hasTextNode(el)) return false
            const style = getComputedStyle(el);
            const lh = parseFloat(style.lineHeight);
            const fs = parseFloat(style.fontSize);
            const base = isNaN(lh) ? 1.25 * fs : lh; // si es 'normal', lo tratamos como 0
            el.dataset.lineHeight = base;
            return true
        });
        lineHeightTargets.length = 0;
        lineHeightTargets.push(...targets);
    }

    setLevel(){
        if(states.line_height === false) {
            states.line_height = 0;
            this.activate();
        }
        else if(states.line_height +1 < 4){
            states.line_height += 1;
            this.#setLineHeightSpacing();
        }
        else this.deactivate();
    }

    #setLineHeightSpacing(){
        lineHeightTargets.forEach(el => {
            const base = el.dataset.lineHeight;
            const newVal = base * lineHeightLevels[states.line_height];
            el.style.lineHeight = `${newVal}px`;
        });
        Array.from(this.$level_indicator.children).forEach(item => item.classList.remove("active"));
        this.$level_indicator.children[states.line_height].classList.add("active");
    }

    activate(){
        this.#selectTargets();
        this.#setLineHeightSpacing();
        this.$btn.classList.add('active');
    }

    deactivate(){
        Array.from(document.querySelectorAll("[data-line-height]")).forEach(el=>{
            el.style.removeProperty("line-height");
            delete el.dataset.lineHeight;
        });
        lineHeightTargets.length = 0;
        this.$btn.classList.remove('active');
        states.line_height = false;
        Array.from(this.$level_indicator.children).forEach(item => item.classList.remove("active"));
    }
}

const lineHeightSpacing = new LineHeightSpacing();

class LetterSpacing{
    constructor(){
        this.$btn = null;
        this.$level_indicator = null;
    }

    init(){
        this.$btn = document.getElementById('btn-letterspacing'); // botón para activar/desactivar el espaciado de letras
        this.$level_indicator = document.getElementById("letterSpacing-levels");
    }

    #selectTargets(){
        let targets = Array.from(document.querySelectorAll('*')).filter(el => {
            if (blacklist.has(el.tagName)) return false;
            if (el.closest(excludeSelector)) return false;
            if (!isVisibleText(el)) return false
            if (!hasTextNode(el)) return false
            const style = getComputedStyle(el);
            const ls = parseFloat(style.letterSpacing);
            const ws = parseFloat(style.wordSpacing);

            const baseLetter = isNaN(ls) ? 0 : ls; // si es 'normal', lo tratamos como 0
            const baseWord = isNaN(ws) ? 0 : ws;
            el.dataset.letterSpacing = baseLetter;
            el.dataset.wordSpacing = baseWord;
            return true
        });
        letterSpacingtargets.length=0;
        letterSpacingtargets.push(...targets);
    }

    #setLetterSpacing(){
        letterSpacingtargets.forEach(el => {
            const baseLetter = Number(el.dataset.letterSpacing);
            const baseWord = Number(el.dataset.wordSpacing);
            const newLetter = baseLetter + letterSpacinglevels[states.letter_spacing].letter;
            const newWord = baseWord + letterSpacinglevels[states.letter_spacing].word;
            el.style.letterSpacing = `${newLetter}px`;
            el.style.wordSpacing = `${newWord}px`;
        });
        Array.from(this.$level_indicator.children).forEach(item => item.classList.remove("active"));
        this.$level_indicator.children[states.letter_spacing].classList.add("active");
    }

    activate(){
        this.#selectTargets();
        this.#setLetterSpacing();
        this.$btn.classList.add('active');
    }

    setLevel(){
        if(states.letter_spacing === false) {
            states.letter_spacing = 0;
            this.activate();
            return
        }
        if(states.letter_spacing +1 < 4){
            states.letter_spacing += 1;
            this.#setLetterSpacing();
        }
        else this.deactivate();
    }

    deactivate(){
        Array.from(document.querySelectorAll("[data-letter-spacing]")).forEach(el=>{
            el.style.removeProperty("letter-spacing");
            el.style.removeProperty("word-spacing");
            delete el.dataset.letterSpacing;
            delete el.dataset.wordSpacing;
        });
        letterSpacingtargets.length = 0;
        this.$btn.classList.remove('active');
        states.letter_spacing = false;
        Array.from(this.$level_indicator.children).forEach(item => item.classList.remove("active"));
    }
}

const letterSpacing = new LetterSpacing();

class InvertColor{
    constructor(){
        this.$btn = null; // botón para activar/desactivar la inversión de colores
    }

    init(){
        this.$btn = document.getElementById('btn-color-invert'); // botón para activar/desactivar la inversión de colores
    }

    activate(){
        document.documentElement.classList.add('WAWInvertedColor');
        this.$btn.classList.add('active');
        states.color_invert = true;
    }

    deactivate(){
        document.documentElement.classList.remove('WAWInvertedColor');
        this.$btn.classList.remove('active');
        states.color_invert = false;
    }
    
    toggle(){
        states.color_invert ? this.deactivate() : this.activate();
    }
}

const invertColor = new InvertColor();

class GrayScale{
    constructor(){
        this.$btn = null; // botón para activar/desactivar la escala de grises
    }

    init(){
        this.$btn = document.getElementById('btn-greyscale'); // botón para activar/desactivar la escala de grises
    }

    activate(){
        document.documentElement.classList.add('WAWGreyscale');
        this.$btn.classList.add('active');
        states.greyscale = true;
    }
    deactivate(){
        document.documentElement.classList.remove('WAWGreyscale');
        this.$btn.classList.remove('active');
        states.greyscale = false;
    }

    toggle(){
        states.greyscale ? this.deactivate() : this.activate();
    }
}

const grayScale = new GrayScale();

class BigCursor {
    constructor() {
        this.$btn = null;
    }

    init() {
        this.$btn = document.getElementById('btn-big-cursor');
    }

    activate() {
        document.documentElement.classList.add('WAWBigCursor');
        this.$btn.classList.add('active');
        states.big_cursor = true;
    }

    deactivate() {
        document.documentElement.classList.remove('WAWBigCursor');
        this.$btn.classList.remove('active');
        states.big_cursor = false;
    }

    toggle() {
        states.big_cursor ? this.deactivate() : this.activate();
    }
}

const bigCursor = new BigCursor();

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var hammer = {exports: {}};

/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
hammer.exports;

var hasRequiredHammer;

function requireHammer () {
	if (hasRequiredHammer) return hammer.exports;
	hasRequiredHammer = 1;
	(function (module) {
		(function(window, document, exportName, undefined$1) {

		var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
		var TEST_ELEMENT = document.createElement('div');

		var TYPE_FUNCTION = 'function';

		var round = Math.round;
		var abs = Math.abs;
		var now = Date.now;

		/**
		 * set a timeout with a given scope
		 * @param {Function} fn
		 * @param {Number} timeout
		 * @param {Object} context
		 * @returns {number}
		 */
		function setTimeoutContext(fn, timeout, context) {
		    return setTimeout(bindFn(fn, context), timeout);
		}

		/**
		 * if the argument is an array, we want to execute the fn on each entry
		 * if it aint an array we don't want to do a thing.
		 * this is used by all the methods that accept a single and array argument.
		 * @param {*|Array} arg
		 * @param {String} fn
		 * @param {Object} [context]
		 * @returns {Boolean}
		 */
		function invokeArrayArg(arg, fn, context) {
		    if (Array.isArray(arg)) {
		        each(arg, context[fn], context);
		        return true;
		    }
		    return false;
		}

		/**
		 * walk objects and arrays
		 * @param {Object} obj
		 * @param {Function} iterator
		 * @param {Object} context
		 */
		function each(obj, iterator, context) {
		    var i;

		    if (!obj) {
		        return;
		    }

		    if (obj.forEach) {
		        obj.forEach(iterator, context);
		    } else if (obj.length !== undefined$1) {
		        i = 0;
		        while (i < obj.length) {
		            iterator.call(context, obj[i], i, obj);
		            i++;
		        }
		    } else {
		        for (i in obj) {
		            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
		        }
		    }
		}

		/**
		 * wrap a method with a deprecation warning and stack trace
		 * @param {Function} method
		 * @param {String} name
		 * @param {String} message
		 * @returns {Function} A new function wrapping the supplied method.
		 */
		function deprecate(method, name, message) {
		    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
		    return function() {
		        var e = new Error('get-stack-trace');
		        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
		            .replace(/^\s+at\s+/gm, '')
		            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

		        var log = window.console && (window.console.warn || window.console.log);
		        if (log) {
		            log.call(window.console, deprecationMessage, stack);
		        }
		        return method.apply(this, arguments);
		    };
		}

		/**
		 * extend object.
		 * means that properties in dest will be overwritten by the ones in src.
		 * @param {Object} target
		 * @param {...Object} objects_to_assign
		 * @returns {Object} target
		 */
		var assign;
		if (typeof Object.assign !== 'function') {
		    assign = function assign(target) {
		        if (target === undefined$1 || target === null) {
		            throw new TypeError('Cannot convert undefined or null to object');
		        }

		        var output = Object(target);
		        for (var index = 1; index < arguments.length; index++) {
		            var source = arguments[index];
		            if (source !== undefined$1 && source !== null) {
		                for (var nextKey in source) {
		                    if (source.hasOwnProperty(nextKey)) {
		                        output[nextKey] = source[nextKey];
		                    }
		                }
		            }
		        }
		        return output;
		    };
		} else {
		    assign = Object.assign;
		}

		/**
		 * extend object.
		 * means that properties in dest will be overwritten by the ones in src.
		 * @param {Object} dest
		 * @param {Object} src
		 * @param {Boolean} [merge=false]
		 * @returns {Object} dest
		 */
		var extend = deprecate(function extend(dest, src, merge) {
		    var keys = Object.keys(src);
		    var i = 0;
		    while (i < keys.length) {
		        if (!merge || (merge && dest[keys[i]] === undefined$1)) {
		            dest[keys[i]] = src[keys[i]];
		        }
		        i++;
		    }
		    return dest;
		}, 'extend', 'Use `assign`.');

		/**
		 * merge the values from src in the dest.
		 * means that properties that exist in dest will not be overwritten by src
		 * @param {Object} dest
		 * @param {Object} src
		 * @returns {Object} dest
		 */
		var merge = deprecate(function merge(dest, src) {
		    return extend(dest, src, true);
		}, 'merge', 'Use `assign`.');

		/**
		 * simple class inheritance
		 * @param {Function} child
		 * @param {Function} base
		 * @param {Object} [properties]
		 */
		function inherit(child, base, properties) {
		    var baseP = base.prototype,
		        childP;

		    childP = child.prototype = Object.create(baseP);
		    childP.constructor = child;
		    childP._super = baseP;

		    if (properties) {
		        assign(childP, properties);
		    }
		}

		/**
		 * simple function bind
		 * @param {Function} fn
		 * @param {Object} context
		 * @returns {Function}
		 */
		function bindFn(fn, context) {
		    return function boundFn() {
		        return fn.apply(context, arguments);
		    };
		}

		/**
		 * let a boolean value also be a function that must return a boolean
		 * this first item in args will be used as the context
		 * @param {Boolean|Function} val
		 * @param {Array} [args]
		 * @returns {Boolean}
		 */
		function boolOrFn(val, args) {
		    if (typeof val == TYPE_FUNCTION) {
		        return val.apply(args ? args[0] || undefined$1 : undefined$1, args);
		    }
		    return val;
		}

		/**
		 * use the val2 when val1 is undefined
		 * @param {*} val1
		 * @param {*} val2
		 * @returns {*}
		 */
		function ifUndefined(val1, val2) {
		    return (val1 === undefined$1) ? val2 : val1;
		}

		/**
		 * addEventListener with multiple events at once
		 * @param {EventTarget} target
		 * @param {String} types
		 * @param {Function} handler
		 */
		function addEventListeners(target, types, handler) {
		    each(splitStr(types), function(type) {
		        target.addEventListener(type, handler, false);
		    });
		}

		/**
		 * removeEventListener with multiple events at once
		 * @param {EventTarget} target
		 * @param {String} types
		 * @param {Function} handler
		 */
		function removeEventListeners(target, types, handler) {
		    each(splitStr(types), function(type) {
		        target.removeEventListener(type, handler, false);
		    });
		}

		/**
		 * find if a node is in the given parent
		 * @method hasParent
		 * @param {HTMLElement} node
		 * @param {HTMLElement} parent
		 * @return {Boolean} found
		 */
		function hasParent(node, parent) {
		    while (node) {
		        if (node == parent) {
		            return true;
		        }
		        node = node.parentNode;
		    }
		    return false;
		}

		/**
		 * small indexOf wrapper
		 * @param {String} str
		 * @param {String} find
		 * @returns {Boolean} found
		 */
		function inStr(str, find) {
		    return str.indexOf(find) > -1;
		}

		/**
		 * split string on whitespace
		 * @param {String} str
		 * @returns {Array} words
		 */
		function splitStr(str) {
		    return str.trim().split(/\s+/g);
		}

		/**
		 * find if a array contains the object using indexOf or a simple polyFill
		 * @param {Array} src
		 * @param {String} find
		 * @param {String} [findByKey]
		 * @return {Boolean|Number} false when not found, or the index
		 */
		function inArray(src, find, findByKey) {
		    if (src.indexOf && !findByKey) {
		        return src.indexOf(find);
		    } else {
		        var i = 0;
		        while (i < src.length) {
		            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
		                return i;
		            }
		            i++;
		        }
		        return -1;
		    }
		}

		/**
		 * convert array-like objects to real arrays
		 * @param {Object} obj
		 * @returns {Array}
		 */
		function toArray(obj) {
		    return Array.prototype.slice.call(obj, 0);
		}

		/**
		 * unique array with objects based on a key (like 'id') or just by the array's value
		 * @param {Array} src [{id:1},{id:2},{id:1}]
		 * @param {String} [key]
		 * @param {Boolean} [sort=False]
		 * @returns {Array} [{id:1},{id:2}]
		 */
		function uniqueArray(src, key, sort) {
		    var results = [];
		    var values = [];
		    var i = 0;

		    while (i < src.length) {
		        var val = key ? src[i][key] : src[i];
		        if (inArray(values, val) < 0) {
		            results.push(src[i]);
		        }
		        values[i] = val;
		        i++;
		    }

		    if (sort) {
		        if (!key) {
		            results = results.sort();
		        } else {
		            results = results.sort(function sortUniqueArray(a, b) {
		                return a[key] > b[key];
		            });
		        }
		    }

		    return results;
		}

		/**
		 * get the prefixed property
		 * @param {Object} obj
		 * @param {String} property
		 * @returns {String|Undefined} prefixed
		 */
		function prefixed(obj, property) {
		    var prefix, prop;
		    var camelProp = property[0].toUpperCase() + property.slice(1);

		    var i = 0;
		    while (i < VENDOR_PREFIXES.length) {
		        prefix = VENDOR_PREFIXES[i];
		        prop = (prefix) ? prefix + camelProp : property;

		        if (prop in obj) {
		            return prop;
		        }
		        i++;
		    }
		    return undefined$1;
		}

		/**
		 * get a unique id
		 * @returns {number} uniqueId
		 */
		var _uniqueId = 1;
		function uniqueId() {
		    return _uniqueId++;
		}

		/**
		 * get the window object of an element
		 * @param {HTMLElement} element
		 * @returns {DocumentView|Window}
		 */
		function getWindowForElement(element) {
		    var doc = element.ownerDocument || element;
		    return (doc.defaultView || doc.parentWindow || window);
		}

		var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

		var SUPPORT_TOUCH = ('ontouchstart' in window);
		var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined$1;
		var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

		var INPUT_TYPE_TOUCH = 'touch';
		var INPUT_TYPE_PEN = 'pen';
		var INPUT_TYPE_MOUSE = 'mouse';
		var INPUT_TYPE_KINECT = 'kinect';

		var COMPUTE_INTERVAL = 25;

		var INPUT_START = 1;
		var INPUT_MOVE = 2;
		var INPUT_END = 4;
		var INPUT_CANCEL = 8;

		var DIRECTION_NONE = 1;
		var DIRECTION_LEFT = 2;
		var DIRECTION_RIGHT = 4;
		var DIRECTION_UP = 8;
		var DIRECTION_DOWN = 16;

		var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
		var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
		var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

		var PROPS_XY = ['x', 'y'];
		var PROPS_CLIENT_XY = ['clientX', 'clientY'];

		/**
		 * create new input type manager
		 * @param {Manager} manager
		 * @param {Function} callback
		 * @returns {Input}
		 * @constructor
		 */
		function Input(manager, callback) {
		    var self = this;
		    this.manager = manager;
		    this.callback = callback;
		    this.element = manager.element;
		    this.target = manager.options.inputTarget;

		    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
		    // so when disabled the input events are completely bypassed.
		    this.domHandler = function(ev) {
		        if (boolOrFn(manager.options.enable, [manager])) {
		            self.handler(ev);
		        }
		    };

		    this.init();

		}

		Input.prototype = {
		    /**
		     * should handle the inputEvent data and trigger the callback
		     * @virtual
		     */
		    handler: function() { },

		    /**
		     * bind the events
		     */
		    init: function() {
		        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
		        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
		        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
		    },

		    /**
		     * unbind the events
		     */
		    destroy: function() {
		        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
		        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
		        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
		    }
		};

		/**
		 * create new input type manager
		 * called by the Manager constructor
		 * @param {Hammer} manager
		 * @returns {Input}
		 */
		function createInputInstance(manager) {
		    var Type;
		    var inputClass = manager.options.inputClass;

		    if (inputClass) {
		        Type = inputClass;
		    } else if (SUPPORT_POINTER_EVENTS) {
		        Type = PointerEventInput;
		    } else if (SUPPORT_ONLY_TOUCH) {
		        Type = TouchInput;
		    } else if (!SUPPORT_TOUCH) {
		        Type = MouseInput;
		    } else {
		        Type = TouchMouseInput;
		    }
		    return new (Type)(manager, inputHandler);
		}

		/**
		 * handle input events
		 * @param {Manager} manager
		 * @param {String} eventType
		 * @param {Object} input
		 */
		function inputHandler(manager, eventType, input) {
		    var pointersLen = input.pointers.length;
		    var changedPointersLen = input.changedPointers.length;
		    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
		    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

		    input.isFirst = !!isFirst;
		    input.isFinal = !!isFinal;

		    if (isFirst) {
		        manager.session = {};
		    }

		    // source event is the normalized value of the domEvents
		    // like 'touchstart, mouseup, pointerdown'
		    input.eventType = eventType;

		    // compute scale, rotation etc
		    computeInputData(manager, input);

		    // emit secret event
		    manager.emit('hammer.input', input);

		    manager.recognize(input);
		    manager.session.prevInput = input;
		}

		/**
		 * extend the data with some usable properties like scale, rotate, velocity etc
		 * @param {Object} manager
		 * @param {Object} input
		 */
		function computeInputData(manager, input) {
		    var session = manager.session;
		    var pointers = input.pointers;
		    var pointersLength = pointers.length;

		    // store the first input to calculate the distance and direction
		    if (!session.firstInput) {
		        session.firstInput = simpleCloneInputData(input);
		    }

		    // to compute scale and rotation we need to store the multiple touches
		    if (pointersLength > 1 && !session.firstMultiple) {
		        session.firstMultiple = simpleCloneInputData(input);
		    } else if (pointersLength === 1) {
		        session.firstMultiple = false;
		    }

		    var firstInput = session.firstInput;
		    var firstMultiple = session.firstMultiple;
		    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

		    var center = input.center = getCenter(pointers);
		    input.timeStamp = now();
		    input.deltaTime = input.timeStamp - firstInput.timeStamp;

		    input.angle = getAngle(offsetCenter, center);
		    input.distance = getDistance(offsetCenter, center);

		    computeDeltaXY(session, input);
		    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

		    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
		    input.overallVelocityX = overallVelocity.x;
		    input.overallVelocityY = overallVelocity.y;
		    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

		    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
		    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

		    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
		        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

		    computeIntervalInputData(session, input);

		    // find the correct target
		    var target = manager.element;
		    if (hasParent(input.srcEvent.target, target)) {
		        target = input.srcEvent.target;
		    }
		    input.target = target;
		}

		function computeDeltaXY(session, input) {
		    var center = input.center;
		    var offset = session.offsetDelta || {};
		    var prevDelta = session.prevDelta || {};
		    var prevInput = session.prevInput || {};

		    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
		        prevDelta = session.prevDelta = {
		            x: prevInput.deltaX || 0,
		            y: prevInput.deltaY || 0
		        };

		        offset = session.offsetDelta = {
		            x: center.x,
		            y: center.y
		        };
		    }

		    input.deltaX = prevDelta.x + (center.x - offset.x);
		    input.deltaY = prevDelta.y + (center.y - offset.y);
		}

		/**
		 * velocity is calculated every x ms
		 * @param {Object} session
		 * @param {Object} input
		 */
		function computeIntervalInputData(session, input) {
		    var last = session.lastInterval || input,
		        deltaTime = input.timeStamp - last.timeStamp,
		        velocity, velocityX, velocityY, direction;

		    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined$1)) {
		        var deltaX = input.deltaX - last.deltaX;
		        var deltaY = input.deltaY - last.deltaY;

		        var v = getVelocity(deltaTime, deltaX, deltaY);
		        velocityX = v.x;
		        velocityY = v.y;
		        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
		        direction = getDirection(deltaX, deltaY);

		        session.lastInterval = input;
		    } else {
		        // use latest velocity info if it doesn't overtake a minimum period
		        velocity = last.velocity;
		        velocityX = last.velocityX;
		        velocityY = last.velocityY;
		        direction = last.direction;
		    }

		    input.velocity = velocity;
		    input.velocityX = velocityX;
		    input.velocityY = velocityY;
		    input.direction = direction;
		}

		/**
		 * create a simple clone from the input used for storage of firstInput and firstMultiple
		 * @param {Object} input
		 * @returns {Object} clonedInputData
		 */
		function simpleCloneInputData(input) {
		    // make a simple copy of the pointers because we will get a reference if we don't
		    // we only need clientXY for the calculations
		    var pointers = [];
		    var i = 0;
		    while (i < input.pointers.length) {
		        pointers[i] = {
		            clientX: round(input.pointers[i].clientX),
		            clientY: round(input.pointers[i].clientY)
		        };
		        i++;
		    }

		    return {
		        timeStamp: now(),
		        pointers: pointers,
		        center: getCenter(pointers),
		        deltaX: input.deltaX,
		        deltaY: input.deltaY
		    };
		}

		/**
		 * get the center of all the pointers
		 * @param {Array} pointers
		 * @return {Object} center contains `x` and `y` properties
		 */
		function getCenter(pointers) {
		    var pointersLength = pointers.length;

		    // no need to loop when only one touch
		    if (pointersLength === 1) {
		        return {
		            x: round(pointers[0].clientX),
		            y: round(pointers[0].clientY)
		        };
		    }

		    var x = 0, y = 0, i = 0;
		    while (i < pointersLength) {
		        x += pointers[i].clientX;
		        y += pointers[i].clientY;
		        i++;
		    }

		    return {
		        x: round(x / pointersLength),
		        y: round(y / pointersLength)
		    };
		}

		/**
		 * calculate the velocity between two points. unit is in px per ms.
		 * @param {Number} deltaTime
		 * @param {Number} x
		 * @param {Number} y
		 * @return {Object} velocity `x` and `y`
		 */
		function getVelocity(deltaTime, x, y) {
		    return {
		        x: x / deltaTime || 0,
		        y: y / deltaTime || 0
		    };
		}

		/**
		 * get the direction between two points
		 * @param {Number} x
		 * @param {Number} y
		 * @return {Number} direction
		 */
		function getDirection(x, y) {
		    if (x === y) {
		        return DIRECTION_NONE;
		    }

		    if (abs(x) >= abs(y)) {
		        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
		    }
		    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
		}

		/**
		 * calculate the absolute distance between two points
		 * @param {Object} p1 {x, y}
		 * @param {Object} p2 {x, y}
		 * @param {Array} [props] containing x and y keys
		 * @return {Number} distance
		 */
		function getDistance(p1, p2, props) {
		    if (!props) {
		        props = PROPS_XY;
		    }
		    var x = p2[props[0]] - p1[props[0]],
		        y = p2[props[1]] - p1[props[1]];

		    return Math.sqrt((x * x) + (y * y));
		}

		/**
		 * calculate the angle between two coordinates
		 * @param {Object} p1
		 * @param {Object} p2
		 * @param {Array} [props] containing x and y keys
		 * @return {Number} angle
		 */
		function getAngle(p1, p2, props) {
		    if (!props) {
		        props = PROPS_XY;
		    }
		    var x = p2[props[0]] - p1[props[0]],
		        y = p2[props[1]] - p1[props[1]];
		    return Math.atan2(y, x) * 180 / Math.PI;
		}

		/**
		 * calculate the rotation degrees between two pointersets
		 * @param {Array} start array of pointers
		 * @param {Array} end array of pointers
		 * @return {Number} rotation
		 */
		function getRotation(start, end) {
		    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
		}

		/**
		 * calculate the scale factor between two pointersets
		 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
		 * @param {Array} start array of pointers
		 * @param {Array} end array of pointers
		 * @return {Number} scale
		 */
		function getScale(start, end) {
		    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
		}

		var MOUSE_INPUT_MAP = {
		    mousedown: INPUT_START,
		    mousemove: INPUT_MOVE,
		    mouseup: INPUT_END
		};

		var MOUSE_ELEMENT_EVENTS = 'mousedown';
		var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

		/**
		 * Mouse events input
		 * @constructor
		 * @extends Input
		 */
		function MouseInput() {
		    this.evEl = MOUSE_ELEMENT_EVENTS;
		    this.evWin = MOUSE_WINDOW_EVENTS;

		    this.pressed = false; // mousedown state

		    Input.apply(this, arguments);
		}

		inherit(MouseInput, Input, {
		    /**
		     * handle mouse events
		     * @param {Object} ev
		     */
		    handler: function MEhandler(ev) {
		        var eventType = MOUSE_INPUT_MAP[ev.type];

		        // on start we want to have the left mouse button down
		        if (eventType & INPUT_START && ev.button === 0) {
		            this.pressed = true;
		        }

		        if (eventType & INPUT_MOVE && ev.which !== 1) {
		            eventType = INPUT_END;
		        }

		        // mouse must be down
		        if (!this.pressed) {
		            return;
		        }

		        if (eventType & INPUT_END) {
		            this.pressed = false;
		        }

		        this.callback(this.manager, eventType, {
		            pointers: [ev],
		            changedPointers: [ev],
		            pointerType: INPUT_TYPE_MOUSE,
		            srcEvent: ev
		        });
		    }
		});

		var POINTER_INPUT_MAP = {
		    pointerdown: INPUT_START,
		    pointermove: INPUT_MOVE,
		    pointerup: INPUT_END,
		    pointercancel: INPUT_CANCEL,
		    pointerout: INPUT_CANCEL
		};

		// in IE10 the pointer types is defined as an enum
		var IE10_POINTER_TYPE_ENUM = {
		    2: INPUT_TYPE_TOUCH,
		    3: INPUT_TYPE_PEN,
		    4: INPUT_TYPE_MOUSE,
		    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
		};

		var POINTER_ELEMENT_EVENTS = 'pointerdown';
		var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

		// IE10 has prefixed support, and case-sensitive
		if (window.MSPointerEvent && !window.PointerEvent) {
		    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
		    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
		}

		/**
		 * Pointer events input
		 * @constructor
		 * @extends Input
		 */
		function PointerEventInput() {
		    this.evEl = POINTER_ELEMENT_EVENTS;
		    this.evWin = POINTER_WINDOW_EVENTS;

		    Input.apply(this, arguments);

		    this.store = (this.manager.session.pointerEvents = []);
		}

		inherit(PointerEventInput, Input, {
		    /**
		     * handle mouse events
		     * @param {Object} ev
		     */
		    handler: function PEhandler(ev) {
		        var store = this.store;
		        var removePointer = false;

		        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
		        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
		        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

		        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

		        // get index of the event in the store
		        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

		        // start and mouse must be down
		        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
		            if (storeIndex < 0) {
		                store.push(ev);
		                storeIndex = store.length - 1;
		            }
		        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
		            removePointer = true;
		        }

		        // it not found, so the pointer hasn't been down (so it's probably a hover)
		        if (storeIndex < 0) {
		            return;
		        }

		        // update the event in the store
		        store[storeIndex] = ev;

		        this.callback(this.manager, eventType, {
		            pointers: store,
		            changedPointers: [ev],
		            pointerType: pointerType,
		            srcEvent: ev
		        });

		        if (removePointer) {
		            // remove from the store
		            store.splice(storeIndex, 1);
		        }
		    }
		});

		var SINGLE_TOUCH_INPUT_MAP = {
		    touchstart: INPUT_START,
		    touchmove: INPUT_MOVE,
		    touchend: INPUT_END,
		    touchcancel: INPUT_CANCEL
		};

		var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
		var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

		/**
		 * Touch events input
		 * @constructor
		 * @extends Input
		 */
		function SingleTouchInput() {
		    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
		    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
		    this.started = false;

		    Input.apply(this, arguments);
		}

		inherit(SingleTouchInput, Input, {
		    handler: function TEhandler(ev) {
		        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

		        // should we handle the touch events?
		        if (type === INPUT_START) {
		            this.started = true;
		        }

		        if (!this.started) {
		            return;
		        }

		        var touches = normalizeSingleTouches.call(this, ev, type);

		        // when done, reset the started state
		        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
		            this.started = false;
		        }

		        this.callback(this.manager, type, {
		            pointers: touches[0],
		            changedPointers: touches[1],
		            pointerType: INPUT_TYPE_TOUCH,
		            srcEvent: ev
		        });
		    }
		});

		/**
		 * @this {TouchInput}
		 * @param {Object} ev
		 * @param {Number} type flag
		 * @returns {undefined|Array} [all, changed]
		 */
		function normalizeSingleTouches(ev, type) {
		    var all = toArray(ev.touches);
		    var changed = toArray(ev.changedTouches);

		    if (type & (INPUT_END | INPUT_CANCEL)) {
		        all = uniqueArray(all.concat(changed), 'identifier', true);
		    }

		    return [all, changed];
		}

		var TOUCH_INPUT_MAP = {
		    touchstart: INPUT_START,
		    touchmove: INPUT_MOVE,
		    touchend: INPUT_END,
		    touchcancel: INPUT_CANCEL
		};

		var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

		/**
		 * Multi-user touch events input
		 * @constructor
		 * @extends Input
		 */
		function TouchInput() {
		    this.evTarget = TOUCH_TARGET_EVENTS;
		    this.targetIds = {};

		    Input.apply(this, arguments);
		}

		inherit(TouchInput, Input, {
		    handler: function MTEhandler(ev) {
		        var type = TOUCH_INPUT_MAP[ev.type];
		        var touches = getTouches.call(this, ev, type);
		        if (!touches) {
		            return;
		        }

		        this.callback(this.manager, type, {
		            pointers: touches[0],
		            changedPointers: touches[1],
		            pointerType: INPUT_TYPE_TOUCH,
		            srcEvent: ev
		        });
		    }
		});

		/**
		 * @this {TouchInput}
		 * @param {Object} ev
		 * @param {Number} type flag
		 * @returns {undefined|Array} [all, changed]
		 */
		function getTouches(ev, type) {
		    var allTouches = toArray(ev.touches);
		    var targetIds = this.targetIds;

		    // when there is only one touch, the process can be simplified
		    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
		        targetIds[allTouches[0].identifier] = true;
		        return [allTouches, allTouches];
		    }

		    var i,
		        targetTouches,
		        changedTouches = toArray(ev.changedTouches),
		        changedTargetTouches = [],
		        target = this.target;

		    // get target touches from touches
		    targetTouches = allTouches.filter(function(touch) {
		        return hasParent(touch.target, target);
		    });

		    // collect touches
		    if (type === INPUT_START) {
		        i = 0;
		        while (i < targetTouches.length) {
		            targetIds[targetTouches[i].identifier] = true;
		            i++;
		        }
		    }

		    // filter changed touches to only contain touches that exist in the collected target ids
		    i = 0;
		    while (i < changedTouches.length) {
		        if (targetIds[changedTouches[i].identifier]) {
		            changedTargetTouches.push(changedTouches[i]);
		        }

		        // cleanup removed touches
		        if (type & (INPUT_END | INPUT_CANCEL)) {
		            delete targetIds[changedTouches[i].identifier];
		        }
		        i++;
		    }

		    if (!changedTargetTouches.length) {
		        return;
		    }

		    return [
		        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
		        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
		        changedTargetTouches
		    ];
		}

		/**
		 * Combined touch and mouse input
		 *
		 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
		 * This because touch devices also emit mouse events while doing a touch.
		 *
		 * @constructor
		 * @extends Input
		 */

		var DEDUP_TIMEOUT = 2500;
		var DEDUP_DISTANCE = 25;

		function TouchMouseInput() {
		    Input.apply(this, arguments);

		    var handler = bindFn(this.handler, this);
		    this.touch = new TouchInput(this.manager, handler);
		    this.mouse = new MouseInput(this.manager, handler);

		    this.primaryTouch = null;
		    this.lastTouches = [];
		}

		inherit(TouchMouseInput, Input, {
		    /**
		     * handle mouse and touch events
		     * @param {Hammer} manager
		     * @param {String} inputEvent
		     * @param {Object} inputData
		     */
		    handler: function TMEhandler(manager, inputEvent, inputData) {
		        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
		            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

		        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
		            return;
		        }

		        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
		        if (isTouch) {
		            recordTouches.call(this, inputEvent, inputData);
		        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
		            return;
		        }

		        this.callback(manager, inputEvent, inputData);
		    },

		    /**
		     * remove the event listeners
		     */
		    destroy: function destroy() {
		        this.touch.destroy();
		        this.mouse.destroy();
		    }
		});

		function recordTouches(eventType, eventData) {
		    if (eventType & INPUT_START) {
		        this.primaryTouch = eventData.changedPointers[0].identifier;
		        setLastTouch.call(this, eventData);
		    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
		        setLastTouch.call(this, eventData);
		    }
		}

		function setLastTouch(eventData) {
		    var touch = eventData.changedPointers[0];

		    if (touch.identifier === this.primaryTouch) {
		        var lastTouch = {x: touch.clientX, y: touch.clientY};
		        this.lastTouches.push(lastTouch);
		        var lts = this.lastTouches;
		        var removeLastTouch = function() {
		            var i = lts.indexOf(lastTouch);
		            if (i > -1) {
		                lts.splice(i, 1);
		            }
		        };
		        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
		    }
		}

		function isSyntheticEvent(eventData) {
		    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
		    for (var i = 0; i < this.lastTouches.length; i++) {
		        var t = this.lastTouches[i];
		        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
		        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
		            return true;
		        }
		    }
		    return false;
		}

		var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
		var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined$1;

		// magical touchAction value
		var TOUCH_ACTION_COMPUTE = 'compute';
		var TOUCH_ACTION_AUTO = 'auto';
		var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
		var TOUCH_ACTION_NONE = 'none';
		var TOUCH_ACTION_PAN_X = 'pan-x';
		var TOUCH_ACTION_PAN_Y = 'pan-y';
		var TOUCH_ACTION_MAP = getTouchActionProps();

		/**
		 * Touch Action
		 * sets the touchAction property or uses the js alternative
		 * @param {Manager} manager
		 * @param {String} value
		 * @constructor
		 */
		function TouchAction(manager, value) {
		    this.manager = manager;
		    this.set(value);
		}

		TouchAction.prototype = {
		    /**
		     * set the touchAction value on the element or enable the polyfill
		     * @param {String} value
		     */
		    set: function(value) {
		        // find out the touch-action by the event handlers
		        if (value == TOUCH_ACTION_COMPUTE) {
		            value = this.compute();
		        }

		        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
		            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
		        }
		        this.actions = value.toLowerCase().trim();
		    },

		    /**
		     * just re-set the touchAction value
		     */
		    update: function() {
		        this.set(this.manager.options.touchAction);
		    },

		    /**
		     * compute the value for the touchAction property based on the recognizer's settings
		     * @returns {String} value
		     */
		    compute: function() {
		        var actions = [];
		        each(this.manager.recognizers, function(recognizer) {
		            if (boolOrFn(recognizer.options.enable, [recognizer])) {
		                actions = actions.concat(recognizer.getTouchAction());
		            }
		        });
		        return cleanTouchActions(actions.join(' '));
		    },

		    /**
		     * this method is called on each input cycle and provides the preventing of the browser behavior
		     * @param {Object} input
		     */
		    preventDefaults: function(input) {
		        var srcEvent = input.srcEvent;
		        var direction = input.offsetDirection;

		        // if the touch action did prevented once this session
		        if (this.manager.session.prevented) {
		            srcEvent.preventDefault();
		            return;
		        }

		        var actions = this.actions;
		        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
		        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
		        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

		        if (hasNone) {
		            //do not prevent defaults if this is a tap gesture

		            var isTapPointer = input.pointers.length === 1;
		            var isTapMovement = input.distance < 2;
		            var isTapTouchTime = input.deltaTime < 250;

		            if (isTapPointer && isTapMovement && isTapTouchTime) {
		                return;
		            }
		        }

		        if (hasPanX && hasPanY) {
		            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
		            return;
		        }

		        if (hasNone ||
		            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
		            (hasPanX && direction & DIRECTION_VERTICAL)) {
		            return this.preventSrc(srcEvent);
		        }
		    },

		    /**
		     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
		     * @param {Object} srcEvent
		     */
		    preventSrc: function(srcEvent) {
		        this.manager.session.prevented = true;
		        srcEvent.preventDefault();
		    }
		};

		/**
		 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
		 * @param {String} actions
		 * @returns {*}
		 */
		function cleanTouchActions(actions) {
		    // none
		    if (inStr(actions, TOUCH_ACTION_NONE)) {
		        return TOUCH_ACTION_NONE;
		    }

		    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
		    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

		    // if both pan-x and pan-y are set (different recognizers
		    // for different directions, e.g. horizontal pan but vertical swipe?)
		    // we need none (as otherwise with pan-x pan-y combined none of these
		    // recognizers will work, since the browser would handle all panning
		    if (hasPanX && hasPanY) {
		        return TOUCH_ACTION_NONE;
		    }

		    // pan-x OR pan-y
		    if (hasPanX || hasPanY) {
		        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
		    }

		    // manipulation
		    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
		        return TOUCH_ACTION_MANIPULATION;
		    }

		    return TOUCH_ACTION_AUTO;
		}

		function getTouchActionProps() {
		    if (!NATIVE_TOUCH_ACTION) {
		        return false;
		    }
		    var touchMap = {};
		    var cssSupports = window.CSS && window.CSS.supports;
		    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

		        // If css.supports is not supported but there is native touch-action assume it supports
		        // all values. This is the case for IE 10 and 11.
		        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
		    });
		    return touchMap;
		}

		/**
		 * Recognizer flow explained; *
		 * All recognizers have the initial state of POSSIBLE when a input session starts.
		 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
		 * Example session for mouse-input: mousedown -> mousemove -> mouseup
		 *
		 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
		 * which determines with state it should be.
		 *
		 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
		 * POSSIBLE to give it another change on the next cycle.
		 *
		 *               Possible
		 *                  |
		 *            +-----+---------------+
		 *            |                     |
		 *      +-----+-----+               |
		 *      |           |               |
		 *   Failed      Cancelled          |
		 *                          +-------+------+
		 *                          |              |
		 *                      Recognized       Began
		 *                                         |
		 *                                      Changed
		 *                                         |
		 *                                  Ended/Recognized
		 */
		var STATE_POSSIBLE = 1;
		var STATE_BEGAN = 2;
		var STATE_CHANGED = 4;
		var STATE_ENDED = 8;
		var STATE_RECOGNIZED = STATE_ENDED;
		var STATE_CANCELLED = 16;
		var STATE_FAILED = 32;

		/**
		 * Recognizer
		 * Every recognizer needs to extend from this class.
		 * @constructor
		 * @param {Object} options
		 */
		function Recognizer(options) {
		    this.options = assign({}, this.defaults, options || {});

		    this.id = uniqueId();

		    this.manager = null;

		    // default is enable true
		    this.options.enable = ifUndefined(this.options.enable, true);

		    this.state = STATE_POSSIBLE;

		    this.simultaneous = {};
		    this.requireFail = [];
		}

		Recognizer.prototype = {
		    /**
		     * @virtual
		     * @type {Object}
		     */
		    defaults: {},

		    /**
		     * set options
		     * @param {Object} options
		     * @return {Recognizer}
		     */
		    set: function(options) {
		        assign(this.options, options);

		        // also update the touchAction, in case something changed about the directions/enabled state
		        this.manager && this.manager.touchAction.update();
		        return this;
		    },

		    /**
		     * recognize simultaneous with an other recognizer.
		     * @param {Recognizer} otherRecognizer
		     * @returns {Recognizer} this
		     */
		    recognizeWith: function(otherRecognizer) {
		        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
		            return this;
		        }

		        var simultaneous = this.simultaneous;
		        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
		        if (!simultaneous[otherRecognizer.id]) {
		            simultaneous[otherRecognizer.id] = otherRecognizer;
		            otherRecognizer.recognizeWith(this);
		        }
		        return this;
		    },

		    /**
		     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
		     * @param {Recognizer} otherRecognizer
		     * @returns {Recognizer} this
		     */
		    dropRecognizeWith: function(otherRecognizer) {
		        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
		            return this;
		        }

		        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
		        delete this.simultaneous[otherRecognizer.id];
		        return this;
		    },

		    /**
		     * recognizer can only run when an other is failing
		     * @param {Recognizer} otherRecognizer
		     * @returns {Recognizer} this
		     */
		    requireFailure: function(otherRecognizer) {
		        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
		            return this;
		        }

		        var requireFail = this.requireFail;
		        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
		        if (inArray(requireFail, otherRecognizer) === -1) {
		            requireFail.push(otherRecognizer);
		            otherRecognizer.requireFailure(this);
		        }
		        return this;
		    },

		    /**
		     * drop the requireFailure link. it does not remove the link on the other recognizer.
		     * @param {Recognizer} otherRecognizer
		     * @returns {Recognizer} this
		     */
		    dropRequireFailure: function(otherRecognizer) {
		        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
		            return this;
		        }

		        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
		        var index = inArray(this.requireFail, otherRecognizer);
		        if (index > -1) {
		            this.requireFail.splice(index, 1);
		        }
		        return this;
		    },

		    /**
		     * has require failures boolean
		     * @returns {boolean}
		     */
		    hasRequireFailures: function() {
		        return this.requireFail.length > 0;
		    },

		    /**
		     * if the recognizer can recognize simultaneous with an other recognizer
		     * @param {Recognizer} otherRecognizer
		     * @returns {Boolean}
		     */
		    canRecognizeWith: function(otherRecognizer) {
		        return !!this.simultaneous[otherRecognizer.id];
		    },

		    /**
		     * You should use `tryEmit` instead of `emit` directly to check
		     * that all the needed recognizers has failed before emitting.
		     * @param {Object} input
		     */
		    emit: function(input) {
		        var self = this;
		        var state = this.state;

		        function emit(event) {
		            self.manager.emit(event, input);
		        }

		        // 'panstart' and 'panmove'
		        if (state < STATE_ENDED) {
		            emit(self.options.event + stateStr(state));
		        }

		        emit(self.options.event); // simple 'eventName' events

		        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
		            emit(input.additionalEvent);
		        }

		        // panend and pancancel
		        if (state >= STATE_ENDED) {
		            emit(self.options.event + stateStr(state));
		        }
		    },

		    /**
		     * Check that all the require failure recognizers has failed,
		     * if true, it emits a gesture event,
		     * otherwise, setup the state to FAILED.
		     * @param {Object} input
		     */
		    tryEmit: function(input) {
		        if (this.canEmit()) {
		            return this.emit(input);
		        }
		        // it's failing anyway
		        this.state = STATE_FAILED;
		    },

		    /**
		     * can we emit?
		     * @returns {boolean}
		     */
		    canEmit: function() {
		        var i = 0;
		        while (i < this.requireFail.length) {
		            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
		                return false;
		            }
		            i++;
		        }
		        return true;
		    },

		    /**
		     * update the recognizer
		     * @param {Object} inputData
		     */
		    recognize: function(inputData) {
		        // make a new copy of the inputData
		        // so we can change the inputData without messing up the other recognizers
		        var inputDataClone = assign({}, inputData);

		        // is is enabled and allow recognizing?
		        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
		            this.reset();
		            this.state = STATE_FAILED;
		            return;
		        }

		        // reset when we've reached the end
		        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
		            this.state = STATE_POSSIBLE;
		        }

		        this.state = this.process(inputDataClone);

		        // the recognizer has recognized a gesture
		        // so trigger an event
		        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
		            this.tryEmit(inputDataClone);
		        }
		    },

		    /**
		     * return the state of the recognizer
		     * the actual recognizing happens in this method
		     * @virtual
		     * @param {Object} inputData
		     * @returns {Const} STATE
		     */
		    process: function(inputData) { }, // jshint ignore:line

		    /**
		     * return the preferred touch-action
		     * @virtual
		     * @returns {Array}
		     */
		    getTouchAction: function() { },

		    /**
		     * called when the gesture isn't allowed to recognize
		     * like when another is being recognized or it is disabled
		     * @virtual
		     */
		    reset: function() { }
		};

		/**
		 * get a usable string, used as event postfix
		 * @param {Const} state
		 * @returns {String} state
		 */
		function stateStr(state) {
		    if (state & STATE_CANCELLED) {
		        return 'cancel';
		    } else if (state & STATE_ENDED) {
		        return 'end';
		    } else if (state & STATE_CHANGED) {
		        return 'move';
		    } else if (state & STATE_BEGAN) {
		        return 'start';
		    }
		    return '';
		}

		/**
		 * direction cons to string
		 * @param {Const} direction
		 * @returns {String}
		 */
		function directionStr(direction) {
		    if (direction == DIRECTION_DOWN) {
		        return 'down';
		    } else if (direction == DIRECTION_UP) {
		        return 'up';
		    } else if (direction == DIRECTION_LEFT) {
		        return 'left';
		    } else if (direction == DIRECTION_RIGHT) {
		        return 'right';
		    }
		    return '';
		}

		/**
		 * get a recognizer by name if it is bound to a manager
		 * @param {Recognizer|String} otherRecognizer
		 * @param {Recognizer} recognizer
		 * @returns {Recognizer}
		 */
		function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
		    var manager = recognizer.manager;
		    if (manager) {
		        return manager.get(otherRecognizer);
		    }
		    return otherRecognizer;
		}

		/**
		 * This recognizer is just used as a base for the simple attribute recognizers.
		 * @constructor
		 * @extends Recognizer
		 */
		function AttrRecognizer() {
		    Recognizer.apply(this, arguments);
		}

		inherit(AttrRecognizer, Recognizer, {
		    /**
		     * @namespace
		     * @memberof AttrRecognizer
		     */
		    defaults: {
		        /**
		         * @type {Number}
		         * @default 1
		         */
		        pointers: 1
		    },

		    /**
		     * Used to check if it the recognizer receives valid input, like input.distance > 10.
		     * @memberof AttrRecognizer
		     * @param {Object} input
		     * @returns {Boolean} recognized
		     */
		    attrTest: function(input) {
		        var optionPointers = this.options.pointers;
		        return optionPointers === 0 || input.pointers.length === optionPointers;
		    },

		    /**
		     * Process the input and return the state for the recognizer
		     * @memberof AttrRecognizer
		     * @param {Object} input
		     * @returns {*} State
		     */
		    process: function(input) {
		        var state = this.state;
		        var eventType = input.eventType;

		        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
		        var isValid = this.attrTest(input);

		        // on cancel input and we've recognized before, return STATE_CANCELLED
		        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
		            return state | STATE_CANCELLED;
		        } else if (isRecognized || isValid) {
		            if (eventType & INPUT_END) {
		                return state | STATE_ENDED;
		            } else if (!(state & STATE_BEGAN)) {
		                return STATE_BEGAN;
		            }
		            return state | STATE_CHANGED;
		        }
		        return STATE_FAILED;
		    }
		});

		/**
		 * Pan
		 * Recognized when the pointer is down and moved in the allowed direction.
		 * @constructor
		 * @extends AttrRecognizer
		 */
		function PanRecognizer() {
		    AttrRecognizer.apply(this, arguments);

		    this.pX = null;
		    this.pY = null;
		}

		inherit(PanRecognizer, AttrRecognizer, {
		    /**
		     * @namespace
		     * @memberof PanRecognizer
		     */
		    defaults: {
		        event: 'pan',
		        threshold: 10,
		        pointers: 1,
		        direction: DIRECTION_ALL
		    },

		    getTouchAction: function() {
		        var direction = this.options.direction;
		        var actions = [];
		        if (direction & DIRECTION_HORIZONTAL) {
		            actions.push(TOUCH_ACTION_PAN_Y);
		        }
		        if (direction & DIRECTION_VERTICAL) {
		            actions.push(TOUCH_ACTION_PAN_X);
		        }
		        return actions;
		    },

		    directionTest: function(input) {
		        var options = this.options;
		        var hasMoved = true;
		        var distance = input.distance;
		        var direction = input.direction;
		        var x = input.deltaX;
		        var y = input.deltaY;

		        // lock to axis?
		        if (!(direction & options.direction)) {
		            if (options.direction & DIRECTION_HORIZONTAL) {
		                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
		                hasMoved = x != this.pX;
		                distance = Math.abs(input.deltaX);
		            } else {
		                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
		                hasMoved = y != this.pY;
		                distance = Math.abs(input.deltaY);
		            }
		        }
		        input.direction = direction;
		        return hasMoved && distance > options.threshold && direction & options.direction;
		    },

		    attrTest: function(input) {
		        return AttrRecognizer.prototype.attrTest.call(this, input) &&
		            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
		    },

		    emit: function(input) {

		        this.pX = input.deltaX;
		        this.pY = input.deltaY;

		        var direction = directionStr(input.direction);

		        if (direction) {
		            input.additionalEvent = this.options.event + direction;
		        }
		        this._super.emit.call(this, input);
		    }
		});

		/**
		 * Pinch
		 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
		 * @constructor
		 * @extends AttrRecognizer
		 */
		function PinchRecognizer() {
		    AttrRecognizer.apply(this, arguments);
		}

		inherit(PinchRecognizer, AttrRecognizer, {
		    /**
		     * @namespace
		     * @memberof PinchRecognizer
		     */
		    defaults: {
		        event: 'pinch',
		        threshold: 0,
		        pointers: 2
		    },

		    getTouchAction: function() {
		        return [TOUCH_ACTION_NONE];
		    },

		    attrTest: function(input) {
		        return this._super.attrTest.call(this, input) &&
		            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
		    },

		    emit: function(input) {
		        if (input.scale !== 1) {
		            var inOut = input.scale < 1 ? 'in' : 'out';
		            input.additionalEvent = this.options.event + inOut;
		        }
		        this._super.emit.call(this, input);
		    }
		});

		/**
		 * Press
		 * Recognized when the pointer is down for x ms without any movement.
		 * @constructor
		 * @extends Recognizer
		 */
		function PressRecognizer() {
		    Recognizer.apply(this, arguments);

		    this._timer = null;
		    this._input = null;
		}

		inherit(PressRecognizer, Recognizer, {
		    /**
		     * @namespace
		     * @memberof PressRecognizer
		     */
		    defaults: {
		        event: 'press',
		        pointers: 1,
		        time: 251, // minimal time of the pointer to be pressed
		        threshold: 9 // a minimal movement is ok, but keep it low
		    },

		    getTouchAction: function() {
		        return [TOUCH_ACTION_AUTO];
		    },

		    process: function(input) {
		        var options = this.options;
		        var validPointers = input.pointers.length === options.pointers;
		        var validMovement = input.distance < options.threshold;
		        var validTime = input.deltaTime > options.time;

		        this._input = input;

		        // we only allow little movement
		        // and we've reached an end event, so a tap is possible
		        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
		            this.reset();
		        } else if (input.eventType & INPUT_START) {
		            this.reset();
		            this._timer = setTimeoutContext(function() {
		                this.state = STATE_RECOGNIZED;
		                this.tryEmit();
		            }, options.time, this);
		        } else if (input.eventType & INPUT_END) {
		            return STATE_RECOGNIZED;
		        }
		        return STATE_FAILED;
		    },

		    reset: function() {
		        clearTimeout(this._timer);
		    },

		    emit: function(input) {
		        if (this.state !== STATE_RECOGNIZED) {
		            return;
		        }

		        if (input && (input.eventType & INPUT_END)) {
		            this.manager.emit(this.options.event + 'up', input);
		        } else {
		            this._input.timeStamp = now();
		            this.manager.emit(this.options.event, this._input);
		        }
		    }
		});

		/**
		 * Rotate
		 * Recognized when two or more pointer are moving in a circular motion.
		 * @constructor
		 * @extends AttrRecognizer
		 */
		function RotateRecognizer() {
		    AttrRecognizer.apply(this, arguments);
		}

		inherit(RotateRecognizer, AttrRecognizer, {
		    /**
		     * @namespace
		     * @memberof RotateRecognizer
		     */
		    defaults: {
		        event: 'rotate',
		        threshold: 0,
		        pointers: 2
		    },

		    getTouchAction: function() {
		        return [TOUCH_ACTION_NONE];
		    },

		    attrTest: function(input) {
		        return this._super.attrTest.call(this, input) &&
		            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
		    }
		});

		/**
		 * Swipe
		 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
		 * @constructor
		 * @extends AttrRecognizer
		 */
		function SwipeRecognizer() {
		    AttrRecognizer.apply(this, arguments);
		}

		inherit(SwipeRecognizer, AttrRecognizer, {
		    /**
		     * @namespace
		     * @memberof SwipeRecognizer
		     */
		    defaults: {
		        event: 'swipe',
		        threshold: 10,
		        velocity: 0.3,
		        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
		        pointers: 1
		    },

		    getTouchAction: function() {
		        return PanRecognizer.prototype.getTouchAction.call(this);
		    },

		    attrTest: function(input) {
		        var direction = this.options.direction;
		        var velocity;

		        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
		            velocity = input.overallVelocity;
		        } else if (direction & DIRECTION_HORIZONTAL) {
		            velocity = input.overallVelocityX;
		        } else if (direction & DIRECTION_VERTICAL) {
		            velocity = input.overallVelocityY;
		        }

		        return this._super.attrTest.call(this, input) &&
		            direction & input.offsetDirection &&
		            input.distance > this.options.threshold &&
		            input.maxPointers == this.options.pointers &&
		            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
		    },

		    emit: function(input) {
		        var direction = directionStr(input.offsetDirection);
		        if (direction) {
		            this.manager.emit(this.options.event + direction, input);
		        }

		        this.manager.emit(this.options.event, input);
		    }
		});

		/**
		 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
		 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
		 * a single tap.
		 *
		 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
		 * multi-taps being recognized.
		 * @constructor
		 * @extends Recognizer
		 */
		function TapRecognizer() {
		    Recognizer.apply(this, arguments);

		    // previous time and center,
		    // used for tap counting
		    this.pTime = false;
		    this.pCenter = false;

		    this._timer = null;
		    this._input = null;
		    this.count = 0;
		}

		inherit(TapRecognizer, Recognizer, {
		    /**
		     * @namespace
		     * @memberof PinchRecognizer
		     */
		    defaults: {
		        event: 'tap',
		        pointers: 1,
		        taps: 1,
		        interval: 300, // max time between the multi-tap taps
		        time: 250, // max time of the pointer to be down (like finger on the screen)
		        threshold: 9, // a minimal movement is ok, but keep it low
		        posThreshold: 10 // a multi-tap can be a bit off the initial position
		    },

		    getTouchAction: function() {
		        return [TOUCH_ACTION_MANIPULATION];
		    },

		    process: function(input) {
		        var options = this.options;

		        var validPointers = input.pointers.length === options.pointers;
		        var validMovement = input.distance < options.threshold;
		        var validTouchTime = input.deltaTime < options.time;

		        this.reset();

		        if ((input.eventType & INPUT_START) && (this.count === 0)) {
		            return this.failTimeout();
		        }

		        // we only allow little movement
		        // and we've reached an end event, so a tap is possible
		        if (validMovement && validTouchTime && validPointers) {
		            if (input.eventType != INPUT_END) {
		                return this.failTimeout();
		            }

		            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
		            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

		            this.pTime = input.timeStamp;
		            this.pCenter = input.center;

		            if (!validMultiTap || !validInterval) {
		                this.count = 1;
		            } else {
		                this.count += 1;
		            }

		            this._input = input;

		            // if tap count matches we have recognized it,
		            // else it has began recognizing...
		            var tapCount = this.count % options.taps;
		            if (tapCount === 0) {
		                // no failing requirements, immediately trigger the tap event
		                // or wait as long as the multitap interval to trigger
		                if (!this.hasRequireFailures()) {
		                    return STATE_RECOGNIZED;
		                } else {
		                    this._timer = setTimeoutContext(function() {
		                        this.state = STATE_RECOGNIZED;
		                        this.tryEmit();
		                    }, options.interval, this);
		                    return STATE_BEGAN;
		                }
		            }
		        }
		        return STATE_FAILED;
		    },

		    failTimeout: function() {
		        this._timer = setTimeoutContext(function() {
		            this.state = STATE_FAILED;
		        }, this.options.interval, this);
		        return STATE_FAILED;
		    },

		    reset: function() {
		        clearTimeout(this._timer);
		    },

		    emit: function() {
		        if (this.state == STATE_RECOGNIZED) {
		            this._input.tapCount = this.count;
		            this.manager.emit(this.options.event, this._input);
		        }
		    }
		});

		/**
		 * Simple way to create a manager with a default set of recognizers.
		 * @param {HTMLElement} element
		 * @param {Object} [options]
		 * @constructor
		 */
		function Hammer(element, options) {
		    options = options || {};
		    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
		    return new Manager(element, options);
		}

		/**
		 * @const {string}
		 */
		Hammer.VERSION = '2.0.7';

		/**
		 * default settings
		 * @namespace
		 */
		Hammer.defaults = {
		    /**
		     * set if DOM events are being triggered.
		     * But this is slower and unused by simple implementations, so disabled by default.
		     * @type {Boolean}
		     * @default false
		     */
		    domEvents: false,

		    /**
		     * The value for the touchAction property/fallback.
		     * When set to `compute` it will magically set the correct value based on the added recognizers.
		     * @type {String}
		     * @default compute
		     */
		    touchAction: TOUCH_ACTION_COMPUTE,

		    /**
		     * @type {Boolean}
		     * @default true
		     */
		    enable: true,

		    /**
		     * EXPERIMENTAL FEATURE -- can be removed/changed
		     * Change the parent input target element.
		     * If Null, then it is being set the to main element.
		     * @type {Null|EventTarget}
		     * @default null
		     */
		    inputTarget: null,

		    /**
		     * force an input class
		     * @type {Null|Function}
		     * @default null
		     */
		    inputClass: null,

		    /**
		     * Default recognizer setup when calling `Hammer()`
		     * When creating a new Manager these will be skipped.
		     * @type {Array}
		     */
		    preset: [
		        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
		        [RotateRecognizer, {enable: false}],
		        [PinchRecognizer, {enable: false}, ['rotate']],
		        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
		        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
		        [TapRecognizer],
		        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
		        [PressRecognizer]
		    ],

		    /**
		     * Some CSS properties can be used to improve the working of Hammer.
		     * Add them to this method and they will be set when creating a new Manager.
		     * @namespace
		     */
		    cssProps: {
		        /**
		         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
		         * @type {String}
		         * @default 'none'
		         */
		        userSelect: 'none',

		        /**
		         * Disable the Windows Phone grippers when pressing an element.
		         * @type {String}
		         * @default 'none'
		         */
		        touchSelect: 'none',

		        /**
		         * Disables the default callout shown when you touch and hold a touch target.
		         * On iOS, when you touch and hold a touch target such as a link, Safari displays
		         * a callout containing information about the link. This property allows you to disable that callout.
		         * @type {String}
		         * @default 'none'
		         */
		        touchCallout: 'none',

		        /**
		         * Specifies whether zooming is enabled. Used by IE10>
		         * @type {String}
		         * @default 'none'
		         */
		        contentZooming: 'none',

		        /**
		         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
		         * @type {String}
		         * @default 'none'
		         */
		        userDrag: 'none',

		        /**
		         * Overrides the highlight color shown when the user taps a link or a JavaScript
		         * clickable element in iOS. This property obeys the alpha value, if specified.
		         * @type {String}
		         * @default 'rgba(0,0,0,0)'
		         */
		        tapHighlightColor: 'rgba(0,0,0,0)'
		    }
		};

		var STOP = 1;
		var FORCED_STOP = 2;

		/**
		 * Manager
		 * @param {HTMLElement} element
		 * @param {Object} [options]
		 * @constructor
		 */
		function Manager(element, options) {
		    this.options = assign({}, Hammer.defaults, options || {});

		    this.options.inputTarget = this.options.inputTarget || element;

		    this.handlers = {};
		    this.session = {};
		    this.recognizers = [];
		    this.oldCssProps = {};

		    this.element = element;
		    this.input = createInputInstance(this);
		    this.touchAction = new TouchAction(this, this.options.touchAction);

		    toggleCssProps(this, true);

		    each(this.options.recognizers, function(item) {
		        var recognizer = this.add(new (item[0])(item[1]));
		        item[2] && recognizer.recognizeWith(item[2]);
		        item[3] && recognizer.requireFailure(item[3]);
		    }, this);
		}

		Manager.prototype = {
		    /**
		     * set options
		     * @param {Object} options
		     * @returns {Manager}
		     */
		    set: function(options) {
		        assign(this.options, options);

		        // Options that need a little more setup
		        if (options.touchAction) {
		            this.touchAction.update();
		        }
		        if (options.inputTarget) {
		            // Clean up existing event listeners and reinitialize
		            this.input.destroy();
		            this.input.target = options.inputTarget;
		            this.input.init();
		        }
		        return this;
		    },

		    /**
		     * stop recognizing for this session.
		     * This session will be discarded, when a new [input]start event is fired.
		     * When forced, the recognizer cycle is stopped immediately.
		     * @param {Boolean} [force]
		     */
		    stop: function(force) {
		        this.session.stopped = force ? FORCED_STOP : STOP;
		    },

		    /**
		     * run the recognizers!
		     * called by the inputHandler function on every movement of the pointers (touches)
		     * it walks through all the recognizers and tries to detect the gesture that is being made
		     * @param {Object} inputData
		     */
		    recognize: function(inputData) {
		        var session = this.session;
		        if (session.stopped) {
		            return;
		        }

		        // run the touch-action polyfill
		        this.touchAction.preventDefaults(inputData);

		        var recognizer;
		        var recognizers = this.recognizers;

		        // this holds the recognizer that is being recognized.
		        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
		        // if no recognizer is detecting a thing, it is set to `null`
		        var curRecognizer = session.curRecognizer;

		        // reset when the last recognizer is recognized
		        // or when we're in a new session
		        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
		            curRecognizer = session.curRecognizer = null;
		        }

		        var i = 0;
		        while (i < recognizers.length) {
		            recognizer = recognizers[i];

		            // find out if we are allowed try to recognize the input for this one.
		            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
		            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
		            //      that is being recognized.
		            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
		            //      this can be setup with the `recognizeWith()` method on the recognizer.
		            if (session.stopped !== FORCED_STOP && ( // 1
		                    !curRecognizer || recognizer == curRecognizer || // 2
		                    recognizer.canRecognizeWith(curRecognizer))) { // 3
		                recognizer.recognize(inputData);
		            } else {
		                recognizer.reset();
		            }

		            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
		            // current active recognizer. but only if we don't already have an active recognizer
		            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
		                curRecognizer = session.curRecognizer = recognizer;
		            }
		            i++;
		        }
		    },

		    /**
		     * get a recognizer by its event name.
		     * @param {Recognizer|String} recognizer
		     * @returns {Recognizer|Null}
		     */
		    get: function(recognizer) {
		        if (recognizer instanceof Recognizer) {
		            return recognizer;
		        }

		        var recognizers = this.recognizers;
		        for (var i = 0; i < recognizers.length; i++) {
		            if (recognizers[i].options.event == recognizer) {
		                return recognizers[i];
		            }
		        }
		        return null;
		    },

		    /**
		     * add a recognizer to the manager
		     * existing recognizers with the same event name will be removed
		     * @param {Recognizer} recognizer
		     * @returns {Recognizer|Manager}
		     */
		    add: function(recognizer) {
		        if (invokeArrayArg(recognizer, 'add', this)) {
		            return this;
		        }

		        // remove existing
		        var existing = this.get(recognizer.options.event);
		        if (existing) {
		            this.remove(existing);
		        }

		        this.recognizers.push(recognizer);
		        recognizer.manager = this;

		        this.touchAction.update();
		        return recognizer;
		    },

		    /**
		     * remove a recognizer by name or instance
		     * @param {Recognizer|String} recognizer
		     * @returns {Manager}
		     */
		    remove: function(recognizer) {
		        if (invokeArrayArg(recognizer, 'remove', this)) {
		            return this;
		        }

		        recognizer = this.get(recognizer);

		        // let's make sure this recognizer exists
		        if (recognizer) {
		            var recognizers = this.recognizers;
		            var index = inArray(recognizers, recognizer);

		            if (index !== -1) {
		                recognizers.splice(index, 1);
		                this.touchAction.update();
		            }
		        }

		        return this;
		    },

		    /**
		     * bind event
		     * @param {String} events
		     * @param {Function} handler
		     * @returns {EventEmitter} this
		     */
		    on: function(events, handler) {
		        if (events === undefined$1) {
		            return;
		        }
		        if (handler === undefined$1) {
		            return;
		        }

		        var handlers = this.handlers;
		        each(splitStr(events), function(event) {
		            handlers[event] = handlers[event] || [];
		            handlers[event].push(handler);
		        });
		        return this;
		    },

		    /**
		     * unbind event, leave emit blank to remove all handlers
		     * @param {String} events
		     * @param {Function} [handler]
		     * @returns {EventEmitter} this
		     */
		    off: function(events, handler) {
		        if (events === undefined$1) {
		            return;
		        }

		        var handlers = this.handlers;
		        each(splitStr(events), function(event) {
		            if (!handler) {
		                delete handlers[event];
		            } else {
		                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
		            }
		        });
		        return this;
		    },

		    /**
		     * emit event to the listeners
		     * @param {String} event
		     * @param {Object} data
		     */
		    emit: function(event, data) {
		        // we also want to trigger dom events
		        if (this.options.domEvents) {
		            triggerDomEvent(event, data);
		        }

		        // no handlers, so skip it all
		        var handlers = this.handlers[event] && this.handlers[event].slice();
		        if (!handlers || !handlers.length) {
		            return;
		        }

		        data.type = event;
		        data.preventDefault = function() {
		            data.srcEvent.preventDefault();
		        };

		        var i = 0;
		        while (i < handlers.length) {
		            handlers[i](data);
		            i++;
		        }
		    },

		    /**
		     * destroy the manager and unbinds all events
		     * it doesn't unbind dom events, that is the user own responsibility
		     */
		    destroy: function() {
		        this.element && toggleCssProps(this, false);

		        this.handlers = {};
		        this.session = {};
		        this.input.destroy();
		        this.element = null;
		    }
		};

		/**
		 * add/remove the css properties as defined in manager.options.cssProps
		 * @param {Manager} manager
		 * @param {Boolean} add
		 */
		function toggleCssProps(manager, add) {
		    var element = manager.element;
		    if (!element.style) {
		        return;
		    }
		    var prop;
		    each(manager.options.cssProps, function(value, name) {
		        prop = prefixed(element.style, name);
		        if (add) {
		            manager.oldCssProps[prop] = element.style[prop];
		            element.style[prop] = value;
		        } else {
		            element.style[prop] = manager.oldCssProps[prop] || '';
		        }
		    });
		    if (!add) {
		        manager.oldCssProps = {};
		    }
		}

		/**
		 * trigger dom event
		 * @param {String} event
		 * @param {Object} data
		 */
		function triggerDomEvent(event, data) {
		    var gestureEvent = document.createEvent('Event');
		    gestureEvent.initEvent(event, true, true);
		    gestureEvent.gesture = data;
		    data.target.dispatchEvent(gestureEvent);
		}

		assign(Hammer, {
		    INPUT_START: INPUT_START,
		    INPUT_MOVE: INPUT_MOVE,
		    INPUT_END: INPUT_END,
		    INPUT_CANCEL: INPUT_CANCEL,

		    STATE_POSSIBLE: STATE_POSSIBLE,
		    STATE_BEGAN: STATE_BEGAN,
		    STATE_CHANGED: STATE_CHANGED,
		    STATE_ENDED: STATE_ENDED,
		    STATE_RECOGNIZED: STATE_RECOGNIZED,
		    STATE_CANCELLED: STATE_CANCELLED,
		    STATE_FAILED: STATE_FAILED,

		    DIRECTION_NONE: DIRECTION_NONE,
		    DIRECTION_LEFT: DIRECTION_LEFT,
		    DIRECTION_RIGHT: DIRECTION_RIGHT,
		    DIRECTION_UP: DIRECTION_UP,
		    DIRECTION_DOWN: DIRECTION_DOWN,
		    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
		    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
		    DIRECTION_ALL: DIRECTION_ALL,

		    Manager: Manager,
		    Input: Input,
		    TouchAction: TouchAction,

		    TouchInput: TouchInput,
		    MouseInput: MouseInput,
		    PointerEventInput: PointerEventInput,
		    TouchMouseInput: TouchMouseInput,
		    SingleTouchInput: SingleTouchInput,

		    Recognizer: Recognizer,
		    AttrRecognizer: AttrRecognizer,
		    Tap: TapRecognizer,
		    Pan: PanRecognizer,
		    Swipe: SwipeRecognizer,
		    Pinch: PinchRecognizer,
		    Rotate: RotateRecognizer,
		    Press: PressRecognizer,

		    on: addEventListeners,
		    off: removeEventListeners,
		    each: each,
		    merge: merge,
		    extend: extend,
		    assign: assign,
		    inherit: inherit,
		    bindFn: bindFn,
		    prefixed: prefixed
		});

		// this prevents errors when Hammer is loaded in the presence of an AMD
		//  style loader but by script tag, not by the loader.
		var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
		freeGlobal.Hammer = Hammer;

		if (typeof undefined$1 === 'function' && undefined$1.amd) {
		    undefined$1(function() {
		        return Hammer;
		    });
		} else if (module.exports) {
		    module.exports = Hammer;
		} else {
		    window[exportName] = Hammer;
		}

		})(window, document, 'Hammer'); 
	} (hammer));
	return hammer.exports;
}

var hammerExports = requireHammer();
var Hammer = /*@__PURE__*/getDefaultExportFromCjs(hammerExports);

let posYmouse = innerHeight / 2; // posición del mouse en el eje Y - para la máscara y linea de lectura

const setPosYMouse = (value) =>{
    posYmouse = value;
};

let touchDevice = false; // indica si el dispositivo es táctil

const setTouchdevice = (value) => {
    touchDevice = value;
};

class ReadingMask{

    constructor(){
        this.$mask = null;
        this.$mask_top = null;
        this.$mask_middle = null;
        this.$controls = null;
        this.$btn_plus = null;
        this.$btn_minus = null;
        this.$btn_close = null;
    
        this.$btn = null;
        this.custom_height = 100;  // altura inicial de la máscara de lectura
        //custom_height = config.reading_mask.height

        this.min_height = 50; // altura mínima de la máscara de lectura
        this.max_height = 300; // altura máxima de la máscara de lectura
    }


    init(){
        this.$mask = document.getElementById('waw-reading-mask'); // máscara de lectura
        this.$mask_top = document.getElementById('waw-reading-mask__top'); // parte superior de la máscara de lectura
        this.$mask_middle = document.getElementById('waw-reading-mask__middle'); // parte central de la máscara de lectura
        this.$controls = document.getElementById('reading-controls-mask'); // controles de la máscara de lectura
        this.$btn_plus = document.getElementById('btn-plus-mask'); // botón para aumentar el tamaño de la máscara
        this.$btn_minus = document.getElementById('btn-minus-mask'); // botón para disminuir el tamaño de la máscara
        this.$btn_close = document.getElementById('btn-close-mask'); // botón para cerrar la máscara de lectura
        this.$btn = document.getElementById('btn-reading-mask'); // botón para activar/desactivar la máscara de lectura
    }

    #updatePosition = (e) => {
        setPosYMouse(e.clientY);
        if(posYmouse <= this.custom_height / 2)
            this.$mask_top.style.height = "0px";
        else if(posYmouse >= innerHeight - (this.custom_height / 2))
            this.$mask_top.style.height = (innerHeight - this.custom_height) + 'px';
        else
            this.$mask_top.style.height = posYmouse - (this.custom_height / 2) + 'px';
    }

    updateSize = () => {
        this.$mask_middle.style.height = this.custom_height + 'px';
        this.$mask_top.style.height = posYmouse - (this.custom_height / 2) + 'px';
    }

    controls(e){ // Controla botones de la máscara de lectura y sus acciones
        this.$controls.classList.add("active");
        if(e.target == this.$btn_plus)
            this.custom_height = (this.custom_height + 10 > this.max_height) ? this.max_height : this.custom_height + 10;
        else if(e.target == this.$btn_minus)
            this.custom_height = (this.custom_height - 10 < this.min_height) ? this.min_height : this.custom_height - 10;
        else if(e.target == this.$btn_close)
            this.deactivate();
        this.updateSize();
    }

    activate(){
        states.reading_mask = true;
        if(touchDevice){
            this.$mask.classList.add("mobile");
            this.$controls.classList.remove("desktop");
            this.#handleTouch();
            if(states.reading_line) readingLine.deactivate(); // Desactiva la línea guía si está activa
            //posYmouse = innerHeight / 2; // En dispositivos táctiles, fija la posición del mouse en el centro de la pantalla
            setPosYMouse(innerHeight/2);
        } 
        else {
            this.$mask.classList.remove("mobile");
            this.$controls.classList.add("desktop");
            document.addEventListener('mousemove', this.#updatePosition); // Añade el evento de movimiento del mouse para la máscara de lectura
        }
        this.updateSize();
        this.$mask.classList.remove('hidden');
        this.$btn.classList.add('active');
    }

    deactivate(){
        states.reading_mask = false;
        document.removeEventListener('mousemove', this.#updatePosition); // Elimina el evento de movimiento del mouse para la máscara de lectura
        this.$mask.classList.add('hidden');
        this.$controls.classList.remove("active");
        this.$btn.classList.remove('active');
    }

    toggle(){
        if(states.reading_mask) this.deactivate();
        else this.activate();
    }

    setOpacity(opacityValue){
        const opacity = parseFloat(opacityValue);
        if(opacity < 0 || opacity > 1) return;
        this.$mask.style.setProperty('--waw-mask-opacity' , opacity);
        config.reading_mask.opacity = opacity;
        const radio = document.querySelector(`input[name="waw-mask-opacity"][value="${opacityValue}"]`);
        if(radio) radio.checked = true;
    }

    setHeight(value){
        const height = parseInt(value);
        if(height < this.min_height || height > this.max_height) return;
        config.reading_mask.height = height;
        this.custom_height = height;
        if(states.reading_mask) this.updateSize();
        const radio = document.querySelector(`input[name="waw-mask-height"][value="${value}"]`);
        if(radio) radio.checked = true;
    }

    #handleTouch = () =>{
        let startY = 0;
        
        const mask = new Hammer(this.$mask_middle);
        
        mask.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
        mask.on("panstart", () => startY = parseFloat(this.$mask_top.style.height));
        mask.on("panmove", (ev) => {
            const newY = startY + ev.deltaY;
            this.$mask_top.style.height = `${newY}px`;
        });
        mask.on("swipe", (ev) => {
            if (ev.direction === Hammer.DIRECTION_LEFT) this.$controls.classList.add("active");
            if (ev.direction === Hammer.DIRECTION_RIGHT) this.$controls.classList.remove("active");
        });
    }
}

const readingMask = new ReadingMask();

class VoiceReading{
    constructor(){
        this.$btn = null; // botón para activar/desactivar la lectura por voz
        this.$voice_options = null;
        this.voiceSelected = null;

        this.focusByKeyboard = false;
        this.elementToRead = null;
        this.tag_list={ //lista de etiquetas comunes para la lectura de pantalla
            p: "Párrafo",
            h1: "Título Nivel 1",
            h2: "Título Nivel 2",
            h3: "Título Nivel 3",
            h4: "Título Nivel 4",
            h5: "Título Nivel 5",
            h6: "Título Nivel 6",
            img: "Imagen",
            span:"",
            strong: "",
            mark: "",
            i: ""
        };
    }

    init(){
        this.$btn = document.getElementById('btn-voice-reading'); // botón para activar/desactivar la lectura por voz
        this.$voice_options = document.getElementById("voices-list");
    }

    #focusByTab(e){if (e.key === 'Tab') focusByKeyboard = true;}
    #focusByMousedown(){this.focusByKeyboard = false;}
    #handleFocusIn(e){
        if (!this.focusByKeyboard) return;
        this.readElement(this.#generateDescription(e.target));
    }

    toggle(){
        if(states.voice_reading) {
            this.deactivate();
            this.readElement("lectura de pantalla desactivada");
        }
        else this.activate();
    }

    activate(){
        if(!states.sound) return
        states.voice_reading = true;
        document.addEventListener('keydown', this.#focusByTab);
        document.addEventListener('mousedown', this.#focusByMousedown);
        document.addEventListener('focusin', this.#handleFocusIn);
        this.$btn.classList.add('active');
        this.readElement("lectura de pantalla activada");

    }

    deactivate(){
        states.voice_reading = false;
        document.removeEventListener('keydown', this.#focusByTab);
        document.removeEventListener('mousedown', this.#focusByMousedown);
        document.removeEventListener('focusin', this.#handleFocusIn);
        this.$btn.classList.remove('active');
        if(this.elementToRead) this.elementToRead.classList.remove("read-text");
        this.elementToRead = null;
    }

    #generateDescription = (target) => {
        let description = '';
        let tag = target.tagName.toLowerCase();
        let rol = target.getAttribute('role');
        let label = target.getAttribute('aria-label') || target.alt || target.innerText || target.value || target.placeholder || "Sin descripción";

        if (rol) description += rol + ': ';
        else if (tag === 'a') description += 'Enlace: ';
        else if (tag === 'button') description += 'Botón: ';
        else if (tag === 'input') description += 'Campo: ';
        else if(tag in this.tag_list) description += this.tag_list[tag] + ': ';

        return description + label.trim();
    }

    readElement(message){
        const text = new SpeechSynthesisUtterance(message);
        text.rate = config.voice_reading.speed;
        if(this.voiceSelected) text.voice = this.voiceSelected;
        speechSynthesis.cancel();
        speechSynthesis.speak(text);
    }

    selectElementToRead(element){
        if(element.tagName.toLowerCase() in this.tag_list){
            if(element.closest(".opcion")) return; // evita leer los elementos del widget
            if(this.elementToRead) this.elementToRead.classList.remove("read-text");
            this.elementToRead = element;
            this.elementToRead.classList.add("read-text");
            this.readElement(this.#generateDescription(element));
        }
    }

    #getLanguage = () => navigator.language.split(/[-_]/)[0].toLowerCase();

    #generateoptionsVoices = (voicelist) => { // Genera el html con las opciones de voces disponibles para elegir
        this.$voice_options.innerHTML = '';
        voicelist.forEach(voice => {
            const option = document.createElement('option');
            option.value = voice.name;
            option.textContent = voice.name + (voice.lang ? ` [${voice.lang}]` : '');
            if(voice.name === config.voice_reading.voice)
                option.selected = true;
            this.$voice_options.appendChild(option);
        });
    }

    getAvailableVoices = () => { // Obtiene una lista de las voces disponibles segun el idioma establecido
        const language = this.#getLanguage();
        let voicelist = speechSynthesis.getVoices().filter(v => v && v.lang && v.lang.startsWith(language));
        if(config.voice_reading.voice == null) {
            this.voiceSelected = voicelist.find(v => v.default) || voicelist[0];
            config.voice_reading.voice = this.voiceSelected.name;
        }
        else {
            this.voiceSelected = voicelist.find(v=> v.name == config.voice_reading.voice);
        }
        this.#generateoptionsVoices(voicelist);
        updateConfigToLocalStorage();
    };

    #changeVoiceReading = (selectedVoiceName)=>{
        let selectedVoice = speechSynthesis.getVoices().find(v => v.name === selectedVoiceName);
        return selectedVoice || null;
    }

    setVoice(voiceValue){
        this.voiceSelected = this.#changeVoiceReading(voiceValue);
        config.voice_reading.voice = this.voiceSelected.name;
    }

    setSpeed(speedValue){
        const speed = parseFloat(speedValue);
        if(speed < 0.5 || speed > 1.5) return;
        config.voice_reading.speed = speed;
        const radio = document.querySelector(`input[name="waw-screenreader-velocity"][value="${speedValue}"]`);
        if(radio) radio.checked = true;
    }
}

const voiceReading = new VoiceReading();

const config = {
    widget: {
        position: "right", // left/right
    },
    reading_mask: {
        height: 100,
        opacity: 0.7
    },
    reading_line: {
        height: 10,
        opacity: 0.6,
        color: "#1cbe00",
    },
    voice_reading: {
        voice: null,
        speed: 1
    }
};

const saveConfigToLocalStorage = () => {
    if (localStorage.getItem('wawConfig')) return;
    localStorage.setItem('wawConfig', JSON.stringify(config));
};

const updateConfigToLocalStorage = () => localStorage.setItem('wawConfig', JSON.stringify(config));

const loadConfigFromLocalStorage = () => {
    const saved = localStorage.getItem('wawConfig');
    if (saved) Object.assign(config, JSON.parse(saved));
    else return;
    readingMask.setOpacity(config.reading_mask.opacity);
    readingMask.setHeight(config.reading_mask.height);
    readingLine.setOpacity(config.reading_line.opacity);
    readingLine.setWeight(config.reading_line.height);
    readingLine.setColor(config.reading_line.color);
    WAW.instance.setPosition(config.widget.position);
    voiceReading.setSpeed(config.voice_reading.speed);
    voiceReading.setVoice(config.voice_reading.voice);
};

/*
    Las siguientes variables se usan para customizar el widget:
        
        mainColor -> cambia el color del rectangulo del titulo
        secondColor -> cambia el color del header y footer del del widget

    La configuracion de los colores se encuentra en style.css y luego 
    dentro :root
*/

class ReadingLine{
    constructor(){
        this.$btn = null;
        this.$btn_close = null;
        this.$line = null;
        this.$controls = null;
        this.allowedColors = [
            "#000000",
            "#1cbe00",
            "#2323ff",
            "#ffea00",
            "#f80000",
            "#ffffff"
        ];
    }


    init(){
        this.$line = document.getElementById('waw-reading-line'); // línea guía de lectura
        this.$controls = document.getElementById('reading-controls-line'); // controles de la línea guía de lectura
        this.$btn_close = document.getElementById('btn-close-line'); // botón para cerrar la guía de lectura
        this.$btn = document.getElementById('btn-reading-line'); // botón para activar/desactivar la línea guía de lectura
    }

    activate(){
        states.reading_line = true;
        let posY = 0;
        if(touchDevice){
            this.$line.classList.add("mobile");
            this.$controls.classList.remove("desktop");
            this.#handleTouch();
            if(states.reading_mask) readingMask.deactivate(); // Desactiva la máscara de lectura si está activa
            posY = innerHeight / 2; // En dispositivos táctiles, fija la posición del mouse en el centro de la pantalla
        } 
        else {
            this.$line.classList.remove("mobile");
            this.$controls.classList.add("desktop");
            posY = posYmouse;
            document.addEventListener('mousemove', this.#update); // Añade el evento de movimiento del mouse para la línea guía
        }
        this.#update({clientY: posY}); // Inicializa la posición de la línea guía al abrirla
        this.$line.classList.remove('hidden');
        this.$btn.classList.add('active');
    }

    deactivate(){
        document.removeEventListener('mousemove', this.#update); // Elimina el evento de movimiento del mouse para la línea guía
        this.$line.classList.add('hidden');
        this.$controls.classList.remove("active");
        this.$btn.classList.remove('active');
        states.reading_line = false;
    }

    toggle(){
        if(states.reading_line) this.deactivate();
        else this.activate();
    }

    #update = (e) =>{ // Actualiza la posición de la línea guía
        setPosYMouse(e.clientY);
        this.$line.style.top = (posYmouse - 4) + 'px'; 
    }

    controls(e){ // Controla el boton de cierre de la guía de lectura
        this.$controls.classList.add("active");
        if(e.target == this.$btn_close){
            this.$line.classList.add('hidden');
            this.$controls.classList.remove("active");
            states.reading_line = false;
            this.$btn.classList.remove('active'); // Desactiva el botón de la guía de lectura
        }
    }

    setOpacity(opacityValue){
        const opacity = parseFloat(opacityValue);
        if(opacity < 0 || opacity > 1) return;
        this.$line.style.setProperty('--waw-line-background' ,`rgba(0,0,0,${opacity})`);
        config.reading_line.opacity = opacity;
        const radio = document.querySelector(`input[name="waw-line-opacity"][value="${opacityValue}"]`);
        if(radio) radio.checked = true;
    }

    setWeight(weightValue){
        if(weightValue!=="4" && weightValue!=="10" && weightValue!=="20") return;
        this.$line.style.setProperty ('--waw-line-weight', weightValue+'px');
        this.$controls.style.setProperty ('--waw-line-control',`calc(-50% + ${parseInt(weightValue)/2}px)`);
        config.reading_line.height = weightValue;
        const radio = document.querySelector(`input[name="waw-line-weight"][value="${weightValue}"]`);
        if(radio) radio.checked = true;
    }

    setColor(colorValue){
        if (!this.allowedColors.includes(colorValue)) return;
        this.$line.style.setProperty('--waw-line-color',colorValue);
        config.reading_line.color = colorValue;
        const radio = document.querySelector(`input[name="waw-line-color"][value='${colorValue}']`);
        if(radio) radio.checked = true;
    }

    #handleTouch = () =>{
        let startY = 0;
        const line = new Hammer(this.$line);

        line.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
        line.on("panstart", () => startY = parseFloat(this.$line.style.top));
        line.on("panmove", (ev) => {
            const newY = startY + ev.deltaY;
            this.$line.style.top = `${newY - 4}px`;
        });
        line.on("panend", () => startY = parseFloat(this.$line.style.top));
        line.on("swipe", (ev) => {
            if (ev.direction === Hammer.DIRECTION_RIGHT) this.$line_controls.classList.add("active");
            if (ev.direction === Hammer.DIRECTION_LEFT) this.$line_controls.classList.remove("active");
        });
    }
}

const readingLine = new ReadingLine();

class HideImages{
    constructor(){
        this.$btn = null; // botón para ocultar imágenes
        this._waw_hiddenImages = []; 
    }

    init(){
        this.$btn = document.getElementById('btn-hide-img'); // botón para ocultar imágenes
    }

    #hideAllImages(){
        this._waw_hiddenImages = [];
        const els = Array.from(document.querySelectorAll('img, picture, canvas.waw-gif-placeholder'));
        els.forEach(el => {
            if (el.dataset.wawHidden) return;
            el.dataset.wawOrigDisplay = el.style.display || '';
            el.style.display = 'none';
            // el.style.opacity = '0';
            el.dataset.wawHidden = '1';
            this._waw_hiddenImages.push(el);
        });
    }

    #restoreAllImages(){
        this._waw_hiddenImages.forEach(el => {
            try {
            el.style.display = el.dataset.wawOrigDisplay || '';
            delete el.dataset.wawHidden;
            delete el.dataset.wawOrigDisplay;
            } catch (e) { }
        });
        this._waw_hiddenImages = [];
    }

    activate(){
        if (this.$btn) this.$btn.classList.add('active');
        states.hide_images = true;
        this.#hideAllImages();
    }

    deactivate(){
        if (this.$btn) this.$btn.classList.remove('active');
        states.hide_images = false;
        this.#restoreAllImages();
    }

    toggle(){
        states.hide_images ? this.deactivate() : this.activate();
    }

}

const hideImages = new HideImages();

class HighlightLinks{
    constructor(){
        this.$btn = null;
    }

    init(){
        this.$btn = document.getElementById('btn-highlight-links'); // botón para activar/desactivar el resaltado de enlaces
    }

    activate(){
        const links = Array.from(document.querySelectorAll('a'));
        links.forEach(el=>{
            if(!el.closest('.waw'))
                el.classList.add("WAWHighlightLinks");
        });
        this.$btn.classList.add('active');
        states.highlight_links = true;
    }

    deactivate(){
        const links = Array.from(document.querySelectorAll(".WAWHighlightLinks"));
        links.forEach(el => el.classList.remove("WAWHighlightLinks"));
        this.$btn.classList.remove('active');
        states.highlight_links = false;
    }

    toggle(){
        states.highlight_links ? this.deactivate() : this.activate();
    }
}

const highlightLinks = new HighlightLinks();

class HighlightHeaders{
    constructor(){
        this.$btn = null;
    }

    init(){
        this.$btn = document.getElementById('btn-highlight-headers'); // botón para activar/desactivar el resaltado de enlaces
    }

    activate(){
        const headers = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
        headers.forEach(el=>{
            if(!el.closest(".waw"))
                el.classList.add("WAWHighlightHeaders");
        });
        this.$btn.classList.add('active');
        states.highlight_headers = true;
    }

    deactivate(){
        const headers = Array.from(document.querySelectorAll(".WAWHighlightHeaders"));
        headers.forEach(el => el.classList.remove("WAWHighlightHeaders"));
        this.$btn.classList.remove('active');
        states.highlight_headers = false;
    }

    toggle(){
        states.highlight_headers ? this.deactivate() : this.activate();
    }
}

const highlightHeaders = new HighlightHeaders();

class DyslexicFont{
    constructor(){
        this.$btn = null; // botón para activar fuente apta para dislexia
    }

    init(){
        this.$btn = document.getElementById('btn-apto-dislexia');
    }

    activate(){
        document.documentElement.classList.add('WAWDyslexicFont');
        if (this.$btn) this.$btn.classList.add('active');
        states.dyslexia_font = true;
    }

    deactivate() {
        document.documentElement.classList.remove('WAWDyslexicFont');
        if (this.$btn) this.$btn.classList.remove('active');
        states.dyslexia_font = false;
    }

    toggle(){
        states.dyslexia_font ? this.deactivate() : this.activate();
    }
}

const dyslexicFont = new DyslexicFont();

class Mute{
    constructor(){
        this.$btn = null;
        this.$mute_indicator = null;
    }

    init(){
        this.$btn = document.getElementById('btn-mute-sound');
        this.$mute_indicator = document.getElementById("waw-mute-indicator");
    }

    activate(){
        document.querySelectorAll('audio, video').forEach(el => {
            el.dataset.muteStatus = el.muted;  // guardamos su estado original
            el.muted = true;
        });
        if(states.voice_reading) {
            voiceReading.deactivate();
            voiceReading.readElement("lectura de pantalla desactivada");
        }
        this.$mute_indicator.classList.add("active");
        this.$btn.classList.add('active');
        states.sound = false;
    }

    deactivate(){
        document.querySelectorAll('[data-mute-status]').forEach(el => {
            el.muted = el.dataset.muteStatus;
            delete el.dataset.muteStatus;
        });
        this.$mute_indicator.classList.remove("active");
        this.$btn.classList.remove('active');
        states.sound = true;
    }

    toggle(){
        !states.sound ? this.deactivate() : this.activate();
    }
}

const mute = new Mute();

class Animations{

    constructor(){
        this.$btn = null;
        this._waw_replacedGifs = [];
        this._waw_videoStates = []; 
    }

    init(){
        this.$btn = document.getElementById('btn-animations'); // botón para activar/desactivar las animaciones
    }

    disable(){
        document.documentElement.classList.add('WAWNoAnimations');
        this.$btn.classList.add('active');
        states.animations = false;
        this.#pauseAllVideos();
        this.#replaceGifsWithCanvas();
    }

    enable(){
        document.documentElement.classList.remove('WAWNoAnimations');
        this.$btn.classList.remove('active');
        states.animations = true;
        this.#restoreGifs();
        this.#resumeAllVideos();
    }

    toggle(){
        if (states.animations) this.disable();
        else this.enable();
    }

    #pauseAllVideos(){
        this._waw_videoStates = [];
        document.querySelectorAll('video').forEach(v => {
            try {
                const wasPlaying = !!(v.currentTime > 0 && !v.paused && !v.ended && v.readyState > 2);
                this._waw_videoStates.push({ video: v, wasPlaying });
                v.pause();
            } catch (err) { }
        });
    }

    #resumeAllVideos(){
        this._waw_videoStates.forEach(({ video, wasPlaying }) => {
            try {
            if (wasPlaying) video.play().catch(()=>{});
            } catch (err) {}
        });
        this._waw_videoStates = [];
    }

    #replaceGifsWithCanvas(){
        this._waw_replacedGifs = [];
        const imgs = Array.from(document.querySelectorAll('img'));
        imgs.forEach(img => {
            const src = img.src || '';
            if (!/\.gif(\?.*)?$/i.test(src)) return;
            if (img.dataset.wawGifReplaced) return;

            const cs = getComputedStyle(img);

            const canvas = document.createElement('canvas');
            canvas.className = (img.className ? img.className + ' ' : '') + 'waw-gif-placeholder';
            canvas.style.cssText = img.getAttribute('style') || '';
            canvas.style.display = cs.display;
            canvas.style.verticalAlign = cs.verticalAlign;
            
            if (cs.getPropertyValue('max-width') && cs.getPropertyValue('max-width') !== 'none') canvas.style.maxWidth = cs.getPropertyValue('max-width');
            if (cs.getPropertyValue('max-height') && cs.getPropertyValue('max-height') !== 'none') canvas.style.maxHeight = cs.getPropertyValue('max-height');

            const objectFit = cs.getPropertyValue('object-fit');
            if (objectFit) canvas.style.objectFit = objectFit;

            canvas.style.width = img.style.width || cs.width;
            canvas.style.height = img.style.height || cs.height;

            const naturalW = img.naturalWidth || parseInt(cs.width) || 100;
            const naturalH = img.naturalHeight || parseInt(cs.height) || 100;
            canvas.width = naturalW;
            canvas.height = naturalH;

            const ctx = canvas.getContext('2d');

            const image = new Image();
            image.crossOrigin = 'anonymous';
            let drawn = false;
            image.onload = () => {
            try {
                ctx.clearRect(0,0,canvas.width,canvas.height);
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                drawn = true;
            } catch (err) {
                drawn = false;
            }
            };
            image.onerror = () => { drawn = false; };

            image.src = src;

            setTimeout(() => {
            const parent = img.parentNode;
            if (!parent) return;

            if (drawn) {
                img.dataset.wawGifReplaced = '1';
                img.dataset.wawGifOrigStyle = img.getAttribute('style') || '';
                img.dataset.wawGifOrigInlineWidth = img.getAttribute('width') || '';
                img.dataset.wawGifOrigInlineHeight = img.getAttribute('height') || '';
                parent.replaceChild(canvas, img);
                this._waw_replacedGifs.push({ original: img, canvas });
            } else {
                img.dataset.wawGifCouldNotFreeze = '1';
                img.classList.add('waw-gif-could-not-freeze');
            }
            }, 60);
        });
    }

    #restoreGifs(){
        if (!Array.isArray(this._waw_replacedGifs) || this._waw_replacedGifs.length === 0) return;
        this._waw_replacedGifs.forEach(entry => {
            if (!entry) return;
            const { original, canvas } = entry;
            if (!original || !canvas) return;
            try {
            if (canvas.parentNode) canvas.parentNode.replaceChild(original, canvas);
            try {
                if (original.dataset.wawGifOrigStyle !== undefined) {
                if (original.dataset.wawGifOrigStyle) original.setAttribute('style', original.dataset.wawGifOrigStyle);
                else original.removeAttribute('style');
                }
                if (original.dataset.wawGifOrigInlineWidth) original.setAttribute('width', original.dataset.wawGifOrigInlineWidth);
                else original.removeAttribute('width');
                if (original.dataset.wawGifOrigInlineHeight) original.setAttribute('height', original.dataset.wawGifOrigInlineHeight);
                else original.removeAttribute('height');
            } catch (e) { }
            delete original.dataset.wawGifReplaced;
            delete original.dataset.wawGifOrigStyle;
            delete original.dataset.wawGifOrigInlineWidth;
            delete original.dataset.wawGifOrigInlineHeight;
            } catch (e) {
            }
        });
        this._waw_replacedGifs = [];

        document.querySelectorAll('img[data-waw-gif-could-not-freeze="1"]').forEach(img => {
            img.classList.remove('waw-gif-could-not-freeze');
            delete img.dataset.wawGifCouldNotFreeze;
        });
    }
}

const animations = new Animations();

const states = {
    text_size: false,
    line_height: false,
    letter_spacing: false,

    color_invert: false,
    greyscale: false,
    big_cursor: false,

    reading_line: false,
    reading_mask: false,
    voice_reading: false, 

    hide_images: false,
    highlight_links: false,
    highlight_headers: false,

    dyslexia_font:false,
    sound: true,
    animations: true,
    dark_theme: false,
};


const saveStatesToLocalStorage = () => {
    if (localStorage.getItem('wawStates')) return;
    localStorage.setItem('wawStates', JSON.stringify(states));
};
const updateStatesToLocalStorage = () => localStorage.setItem('wawStates', JSON.stringify(states));

const loadStatesFromLocalStorage = () => {
    const saved = localStorage.getItem('wawStates');
    if (saved) Object.assign(states, JSON.parse(saved));
    else return;
    if(states.dark_theme) document.documentElement.classList.add("dark-theme");
    if(states.big_cursor) bigCursor.activate();
    if(states.greyscale) grayScale.activate();
    if(states.color_invert) invertColor.activate();
    if(states.highlight_links) highlightLinks.activate();
    if(states.highlight_headers) highlightHeaders.activate();
    if(states.reading_line) readingLine.activate();
    if(states.reading_mask) readingMask.activate();
    if(states.voice_reading) voiceReading.activate();
    if(!states.animations) animations.disable();
    if(states.letter_spacing !== false) letterSpacing.activate();
    if(states.text_size !== false) fontSize.activate();
    if(states.line_height !== false) lineHeightSpacing.activate();
    if(states.hide_images) hideImages.activate();
    if(states.dyslexia_font) dyslexicFont.activate();
    if(!states.sound) mute.activate();
};

/**
 * Funcion que setea los colores al widget.
 * 
 *  -> Se aplican unicamente si el cliente los envia
 *  -> Si el cliente no los envia se aplica los estilos que están en style.css :root
 * 
 * @param {*} colors 
 */
const setColors = (colors = {}) => {
    if (colors) {
        // Modo claro
        if (colors.mainColor) {
            document.documentElement.style.setProperty('--main-color', colors.mainColor);
        }
        if (colors.secondColor) {
            document.documentElement.style.setProperty('--second-color', colors.secondColor);
        }
        if (colors.textColor) {
            document.documentElement.style.setProperty('--text-color', colors.textColor);
        }
        if (colors.background) {
            document.documentElement.style.setProperty('--background', colors.background);
        }
        if (colors.backgroundButton) {
            document.documentElement.style.setProperty('--background-button', colors.backgroundButton);
        }

        // Modo oscuro
        if (colors.mainColorDarkMode) {
            document.documentElement.style.setProperty('--main-color-dark', colors.mainColorDarkMode);
        }
        if (colors.secondColorDarkMode) {
            document.documentElement.style.setProperty('--second-color-dark', colors.secondColorDarkMode);
        }
        if (colors.textColorDarkMode) {
            document.documentElement.style.setProperty('--text-color-dark', colors.textColorDarkMode);
        }
        if (colors.backgroundDarkMode) {
            document.documentElement.style.setProperty('--background-dark', colors.backgroundDarkMode);
        }
        if (colors.backgroundButtonDarkMode) {
            document.documentElement.style.setProperty('--background-button-dark', colors.backgroundButtonDarkMode);
        }
    }
};

const WAW_SCRIPT_URL = document.currentScript?.src || "";

class WAW {
    static instance = null;

    constructor(customConfiguration={}) {
        this.$widget = null; // widget de accesibilidad
        this.$close_button = null;
        this.$open_button = null;
        this.widget_open = false; // estado del widget

        // Lógica del singleton existente
        
        if (WAW.instance) {
            console.warn("WAW ya fue instanciado. Se usará la instancia existente.");
            return WAW.instance;
        }

        // Aplicar los colores personalizados si el cliente los envía

        setColors(customConfiguration.colors);

        this.basePath = this.#getBasePath();
        WAW.instance = this;
    }

    async #init() {
        this.$widget = document.getElementById('waw-widget'); // widget de accesibilidad
        this.$close_button = document.getElementById('close-button');
        this.$open_button = document.getElementById('open-button');
        await this.#injectSprite();
    }

    #getBasePath() {
        if (!WAW_SCRIPT_URL) return "";
        return WAW_SCRIPT_URL.substring(0, WAW_SCRIPT_URL.lastIndexOf("/") + 1);
    }

    async #injectSprite() {
        const basePath = this.#getBasePath();
        const spriteFiles = [
            basePath + "assets/icons/icons.svg",
            basePath + "assets/icons/options.svg"
        ];
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.width = 0;
        div.style.height = 0;
        div.style.display = "none";
        div.style.overflow = "hidden";
        const fetches = spriteFiles.map(async file => {
            const response = await fetch(file);
            if (!response.ok) {
                console.warn("No se pudo cargar el sprite:", file);
                return "";
            }
            return await response.text();
        });
        const svgs = await Promise.all(fetches);
        div.innerHTML = svgs.join("\n");
        document.body.prepend(div);
    }

    setLeft() {
        if (config.widget.position === 'left') return
        this.$widget.classList.add("left");
        this.$open_button.classList.add("left");
        document.getElementById("widget-pos-left").checked = true;
        document.getElementById("waw-mute-indicator").classList.add("right");
        config.widget.position = 'left';
    }

    setRight() {
        if (config.widget.position === 'right') return
        this.$widget.classList.remove("left");
        this.$open_button.classList.remove("left");
        document.getElementById("widget-pos-right").checked = true;
        document.getElementById("waw-mute-indicator").classList.remove("right");
        config.widget.position = 'right';
    }

    setPosition(positionValue) {
        if (positionValue !== "left" && positionValue !== "right") return;
        (positionValue === "right") ? this.setRight() : this.setLeft();
    }

    #isMobile() {
        let mobileAgent = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (mobileAgent) {
            setTouchdevice(true);
            return true
        } else {
            setTouchdevice(false);
            return false
        }
    }

    open() {
        this.$widget.classList.add('open');
        this.$widget.removeAttribute("inert");
        this.$close_button.focus();
        this.$open_button.setAttribute("inert", "");
        this.widget_open = true;
    }

    close() {
        this.$widget.classList.remove('open');
        this.$widget.setAttribute("inert", "");
        this.$open_button.removeAttribute("inert");
        this.$open_button.focus();
        this.widget_open = false;
    }

    toggleWidget() {
        !this.widget_open ? this.open() : this.close();
    }

    toggleTheme() {
        document.documentElement.classList.toggle("dark-theme");
        states.dark_theme = !states.dark_theme;
    }

    resetFunctions() {
        bigCursor.deactivate();
        invertColor.deactivate();
        grayScale.deactivate();
        highlightHeaders.deactivate();
        highlightLinks.deactivate();
        readingLine.deactivate();
        readingMask.deactivate();
        voiceReading.deactivate();
        animations.enable();
        letterSpacing.deactivate();
        lineHeightSpacing.deactivate();
        dyslexicFont.deactivate();
        hideImages.deactivate();
        fontSize.deactivate();
        mute.deactivate();

        if (voiceReading.elementToRead) voiceReading.elementToRead.classList.remove("read-text");
    }

    run() {
        builWidget();
        this.#init();
        fontSize.init();
        readingMask.init();
        readingLine.init();
        voiceReading.init();
        dyslexicFont.init();
        grayScale.init();
        hideImages.init();
        hideImages.init();
        bigCursor.init();
        highlightHeaders.init();
        highlightLinks.init();
        invertColor.init();
        letterSpacing.init();
        lineHeightSpacing.init();
        mute.init();
        animations.init();

        document.addEventListener("click", (e) => {
            setPosYMouse(e.clientY);
            if (e.target.closest("#btn-fontsize")) fontSize.setLevel();
            else if (e.target.closest("#btn-lineheight")) lineHeightSpacing.setLevel();
            else if (e.target.closest("#btn-letterspacing")) letterSpacing.setLevel();
            else if (e.target.closest("#btn-color-invert")) invertColor.toggle();
            else if (e.target.closest("#btn-greyscale")) grayScale.toggle();
            else if (e.target.closest("#btn-big-cursor")) bigCursor.toggle();
            else if (e.target.closest("#btn-reading-line")) readingLine.toggle();
            else if (e.target.closest("#btn-reading-mask")) readingMask.toggle();
            else if (e.target.closest("#btn-voice-reading")) voiceReading.toggle();
            else if (e.target.closest('#btn-hide-img')) hideImages.toggle();
            else if (e.target.closest("#btn-highlight-links")) highlightLinks.toggle();
            else if (e.target.closest("#btn-highlight-headers")) highlightHeaders.toggle();
            else if (e.target.closest("#btn-apto-dislexia")) dyslexicFont.toggle();
            else if (e.target.closest("#btn-mute-sound")) mute.toggle();
            else if (e.target.closest("#btn-animations")) animations.toggle();

            else if (e.target.closest("#open-button") || e.target.closest("#close-button")) this.toggleWidget();
            else if (e.target.closest('[data-waw-function="toggle-theme"]')) this.toggleTheme();

            else if (e.target.closest('[data-waw-function="reset"]')) this.resetFunctions();
            else if (e.target.closest('#reading-controls-mask')) readingMask.controls(e);
            else if (e.target.closest('#reading-controls-line')) readingLine.controls(e);
            else if (e.target.closest('#test-voicereading')) voiceReading.readElement("Texto de prueba para la función de lectura de pantalla");
            else if (this.widget_open && !this.$widget.contains(e.target)) this.toggleWidget(); // cierra el widget al hacer click fuera del mismo

            updateStatesToLocalStorage();
            if (states.voice_reading) voiceReading.selectElementToRead(e.target);
        });

        document.addEventListener('input', (e) => {
            if (e.target.id === "voices-list") voiceReading.setVoice(e.target.value);
            else if (e.target.name === "waw-screenreader-velocity") voiceReading.setSpeed(e.target.value);
            else if (e.target.name === "waw-mask-opacity") readingMask.setOpacity(e.target.value);
            else if (e.target.name === "waw-mask-height") readingMask.setHeight(e.target.value);
            else if (e.target.name === "waw-line-opacity") readingLine.setOpacity(e.target.value);
            else if (e.target.name === "waw-line-weight") readingLine.setWeight(e.target.value);
            else if (e.target.name === "waw-line-color") readingLine.setColor(e.target.value);
            else if (e.target.name === "waw-widget-position") this.setPosition(e.target.value);
            updateConfigToLocalStorage();
        });

        this.#isMobile();
        saveStatesToLocalStorage();
        loadStatesFromLocalStorage();

        speechSynthesis.addEventListener('voiceschanged', () => {
            loadConfigFromLocalStorage();
            voiceReading.getAvailableVoices();
            saveConfigToLocalStorage();
        });

        if (this.#isMobile) speechSynthesis.getVoices(); // en dispositivos moviles puede no dipararse el evento 'voicechanged', fuerzo a que se dispare
    }
}

export { WAW as default };
