let archivosPDF = {};

function init() {
    archivosPDF = JSON.parse(localStorage.getItem('archivosPDF')) || {};
    addClickListeners();
}

function addClickListeners() {
    // SEMANAS
    document.querySelectorAll('.semana').forEach(el => {
        el.onclick = function() {
            const id = this.dataset.semana;
            showWeek(id);
        };
    });
    
    // CERRAR MODAL
    document.querySelector('.close').onclick = closeModal;
}

function showWeek(id) {
    const [u, s] = id.split('-');
    document.getElementById('contenidoSemana').innerHTML = `
        <div class="semana-header">
            <h2>Unidad ${u} - Semana ${s}</h2>
        </div>
        <div class="semana-content">
            <input type="file" id="pdfUpload" accept=".pdf" multiple style="display:none">
            <button onclick="document.getElementById('pdfUpload').click()" 
                    style="background:#3b82f6;color:white;padding:12px 24px;border:none;border-radius:12px;cursor:pointer;font-size:16px">
                📁 Subir PDF
            </button>
            <div id="fileList" style="margin-top:20px">${listFiles(id)}</div>
        </div>
    `;
    
    document.getElementById('pdfUpload').onchange = function(e) {
        uploadFiles(e.target.files, id);
    };
    
    document.getElementById('modalSemana').style.display = 'block';
}

function listFiles(id) {
    if (!archivosPDF[id]) return '<p style="text-align:center;color:#999">No hay PDFs</p>';
    
    return archivosPDF[id].map((f, i) => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:15px;background:white;margin:10px 0;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.1)">
            <span>${f.nombre} <small style="color:#666">(${f.size})</small></span>
            <div>
                <button onclick="viewFile('${id}',${i})" style="background:#10b981;color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;margin-right:5px">
                    👁️ Ver
                </button>
                <button onclick="deleteFile('${id}',${i})" style="background:#ef4444;color:white;border:none;padding:8px 12px;border-radius:6px;cursor:pointer">
                    🗑️ Borrar
                </button>
            </div>
        </div>
    `).join('');
}

function uploadFiles(files, id) {
    if (!archivosPDF[id]) archivosPDF[id] = [];
    
    Array.from(files).forEach(file => {
        if (file.type === 'application/pdf') {
            const reader = new FileReader();
            reader.onload = e => {
                archivosPDF[id].push({
                    nombre: file.name,
                    size: (file.size/1024).toFixed(0)+'KB',
                    data: e.target.result
                });
                localStorage.setItem('archivosPDF', JSON.stringify(archivosPDF));
                document.getElementById('fileList').innerHTML = listFiles(id);
            };
            reader.readAsDataURL(file);
        }
    });
}

function viewFile(id, index) {
    const file = archivosPDF[id][index];
    const win = window.open();
    win.document.write(`
        <html><head><title>${file.nombre}</title>
        <style>body{margin:0;padding:20px;background:#f5f5f5} iframe{width:100%;height:95vh;border:none}</style></head>
        <body><iframe src="${file.data}"></iframe></body></html>
    `);
    win.document.close();
}

function deleteFile(id, index) {
    if (confirm('¿Borrar ' + archivosPDF[id][index].nombre + '?')) {
        archivosPDF[id].splice(index, 1);
        if (archivosPDF[id].length === 0) delete archivosPDF[id];
        localStorage.setItem('archivosPDF', JSON.stringify(archivosPDF));
        document.getElementById('fileList').innerHTML = listFiles(id);
    }
}

function closeModal() {
    document.getElementById('modalSemana').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// INICIAR
init();