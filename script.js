// TUS PDFs (edita aquí)
const pdfsPorSemana = {
    '1-1': [
        { nombre: 'Instalación NFS y SAMBA (1).pdf', desc: 'Estructura HTML' },
        { nombre: 'Matrícula - Seleccion de Asignaturas.pdf', desc: 'Estilos básicos' }
    ],
    '1-2': [
        { nombre: 'Flexbox.pdf', desc: 'Layout flexible' },
        { nombre: 'Ejercicio1.pdf', desc: 'Práctica' }
    ],
    // AGREGAS MÁS ASÍ:
    // '1-3': [
    //     { nombre: 'grid.pdf', desc: 'CSS Grid' }
    // ],
    '2-1': [], // Vacía = sin PDFs
    // ... resto semanas
};

init();

function init() {
    document.querySelectorAll('.semana').forEach(btn => {
        btn.onclick = () => showWeek(btn.dataset.semana);
    });
    
    document.querySelector('.close').onclick = () => {
        document.getElementById('modalSemana').style.display = 'none';
    };
}

function showWeek(id) {
    const pdfs = pdfsPorSemana[id] || [];
    
    let contenido = `
        <div class="semana-header">
            <h2><i class="fas fa-folder-open"></i> Semana ${id}</h2>
            <p>Documentos disponibles</p>
        </div>
        <div class="semana-content">
    `;
    
    if (pdfs.length === 0) {
        contenido += `
            <div style="text-align:center;padding:4rem;color:#94a3b8">
                <i class="fas fa-file-pdf" style="font-size:6rem;opacity:0.3"></i>
                <h3>No hay PDFs</h3>
                <p>Agrega archivos en script.js</p>
            </div>
        `;
    } else {
        pdfs.forEach((pdf, index) => {
            contenido += `
                <div style="margin-bottom:2rem;padding:2rem;background:white;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,0.1)">
                    <h3 style="color:#1e293b;margin-bottom:1rem">${pdf.nombre}</h3>
                    <p style="color:#64748b;margin-bottom:1.5rem">${pdf.desc}</p>
                    <div style="display:flex;gap:1rem">
                        <iframe src="pdfs/${pdf.nombre}#toolbar=1&view=FitH" 
                                style="flex:1;height:400px;border-radius:12px;box-shadow:0 5px 20px rgba(0,0,0,0.1)"></iframe>
                        <div style="display:flex;flex-direction:column;gap:1rem">
                            <a href="pdfs/${pdf.nombre}" target="_blank" 
                               style="background:#3b82f6;color:white;padding:12px 20px;border-radius:12px;text-decoration:none;text-align:center;font-weight:500">
                                📥 Descargar
                            </a>
                            <button onclick="expandirPDF('${pdf.nombre}')" 
                                    style="background:#10b981;color:white;padding:12px 20px;border:none;border-radius:12px;cursor:pointer;font-weight:500">
                                🔍 Ver completo
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    contenido += '</div>';
    
    document.getElementById('contenidoSemana').innerHTML = contenido;
    document.getElementById('modalSemana').style.display = 'block';
}

function expandirPDF(nombre) {
    window.open(`pdfs/${nombre}`, '_blank');
}
