let historial = JSON.parse(localStorage.getItem('historial')) || [];
let animales = JSON.parse(localStorage.getItem('animales')) || [];
let ultimoCosto = parseFloat(localStorage.getItem('ultimoCosto')) || 0;

// LOGIN CORREGIDO
function login(){
  let user = document.getElementById('user').value;
  let pass = document.getElementById('pass').value;

  if(user === "" || pass === ""){
    alert("Por favor ingresa usuario y contraseña");
    return;
  }

  document.getElementById('login').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
}

function logout(){
  location.reload();
}

// NAVEGACIÓN
function mostrar(sec){
  ['dashboard','calculadora','animales','costos','historial'].forEach(id=>{
    document.getElementById(id).classList.add('hidden');
  });
  document.getElementById(sec).classList.remove('hidden');
}

// CALCULADORA
function calcular(){
  let totalPeso = cantidad.value * peso.value;
  let totalVenta = totalPeso * precio.value;
  let ganancia = totalVenta - ultimoCosto;

  let res = `Peso: ${totalPeso} kg | Venta: $${totalVenta} | Ganancia: $${ganancia}`;
  resultado.innerText = res;

  historial.push(res);
  localStorage.setItem('historial', JSON.stringify(historial));
  actualizarHistorial();
}

// ANIMALES
function guardarAnimal(){
  let data = `${tipo.value} - ${edad.value} años - ${pesoAnimal.value} kg`;
  animales.push(data);
  localStorage.setItem('animales', JSON.stringify(animales));
  renderAnimales();
}

function renderAnimales(){
  listaAnimales.innerHTML='';
  animales.forEach((a,i)=>{
    let li=document.createElement('li');
    li.innerHTML = `${a} <button onclick="eliminarAnimal(${i})">❌</button>`;
    listaAnimales.appendChild(li);
  });
}

function eliminarAnimal(i){
  animales.splice(i,1);
  localStorage.setItem('animales', JSON.stringify(animales));
  renderAnimales();
}

// COSTOS
function calcularCosto(){
  ultimoCosto = alimento.value * precioAlimento.value;
  totalCosto.innerText = `Costo: $${ultimoCosto}`;
  localStorage.setItem('ultimoCosto', ultimoCosto);
}

// HISTORIAL
function actualizarHistorial(){
  listaHistorial.innerHTML='';
  historial.forEach(h=>{
    let li=document.createElement('li');
    li.textContent=h;
    listaHistorial.appendChild(li);
  });
}

function limpiarHistorial(){
  historial = [];
  localStorage.removeItem('historial');
  actualizarHistorial();
}

// CHATBOT PRO
function toggleChat(){
  chatbox.style.display = chatbox.style.display==='block'?'none':'block';
}

function responder(){
  let p = chatInput.value.toLowerCase();
  let r = '';

  if(p.includes('precio') || p.includes('venta')){
    r='El precio del ganado depende del mercado, calidad y peso.';
  }
  else if(p.includes('peso')){
    r='Una vaca pesa entre 300 y 600 kg.';
  }
  else if(p.includes('ganancia')){
    r='Ganancia = venta total - costos.';
  }
  else if(p.includes('alimentacion')){
    r='La alimentación representa el mayor costo en ganadería.';
  }
  else if(p.includes('hola')){
    r='Hola 👋 soy tu asistente ganadero.';
  }
  else{
    r='No tengo esa información aún.';
  }

  chatRespuesta.innerText = r;
  chatInput.value='';
}

// INIT
actualizarHistorial();
renderAnimales();