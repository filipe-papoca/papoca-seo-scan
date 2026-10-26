/* Formulário de contato (Home, Contato, Sobre e demais páginas com o
   componente "Formulário"). Mensagens do Figma, notas 1406:25633 (envio) e
   1406:25675 (campos), lidas em 26/10/2026.

   ENVIO · PENDENTE DO DEV: o site ainda não tem para onde mandar os dados.
   Quando houver, ponha a URL em data-endpoint no <form> (POST JSON). Sem
   data-endpoint, o envio é simulado para a revisão de UX: mostra a
   mensagem de sucesso. Para ver a mensagem de erro, abra a página com
   #form-erro no fim do endereço. */
(function () {
  var MSG = {
    vazio: "Preencha este campo para a gente conseguir falar com você.",
    email: "Confira o e-mail. Ele precisa ter o formato nome@empresa.com e ser um e-mail empresarial.",
    celular: "Confira o número. Ele precisa ter DDD e 9 dígitos."
  };
  /* e-mails pessoais, recusados porque o campo pede e-mail empresarial */
  var PESSOAIS = /@(gmail|googlemail|hotmail|outlook|live|msn|yahoo|ymail|icloud|me|mac|aol|bol|uol|terra|ig|r7|proton|protonmail|gmx|zoho)\.(com|com\.br|net|me)$/i;

  function erroDe(c) {
    var v = (c.value || "").trim();
    if (c.required && !v) return MSG.vazio;
    if (c.hasAttribute("data-empresarial") && v) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || PESSOAIS.test(v)) return MSG.email;
    }
    if (c.hasAttribute("data-celular") && v) {
      if (!/^\(\d{2}\)9\d{4}-\d{4}$/.test(v)) return MSG.celular;
    }
    return "";
  }
  function mostrar(c, msg) {
    var p = document.getElementById(c.id + "-erro");
    c.setAttribute("aria-invalid", msg ? "true" : "false");
    c.closest(".fcampo").classList.toggle("is-erro", !!msg);
    if (p) { p.textContent = msg; p.hidden = !msg; }
  }

  document.querySelectorAll("[data-formulario]").forEach(function (form) {
    var campos = Array.prototype.slice.call(form.querySelectorAll("input, textarea"));
    var aviso = form.querySelector(".formulario-v5__aviso--erro");
    var sucesso = form.querySelector(".formulario-v5__sucesso");
    var botao = form.querySelector('[type="submit"]');

    var cel = form.querySelector("[data-celular]");
    if (cel) cel.addEventListener("input", function () {
      var d = cel.value.replace(/\D/g, "").slice(0, 11), v = d;
      if (d.length > 2) v = "(" + d.slice(0, 2) + ")" + d.slice(2);
      if (d.length > 7) v = "(" + d.slice(0, 2) + ")" + d.slice(2, d.length - 4) + "-" + d.slice(-4);
      cel.value = v;
    });
    var ta = form.querySelector("textarea");
    if (ta) ta.addEventListener("input", function () {
      ta.style.height = "auto"; ta.style.height = ta.scrollHeight + 2 + "px";
    });

    /* o erro aparece ao sair do campo e some assim que o campo fica certo */
    campos.forEach(function (c) {
      c.addEventListener("blur", function () { if (c.value || form.classList.contains("foi-enviado")) mostrar(c, erroDe(c)); });
      c.addEventListener("input", function () { if (c.getAttribute("aria-invalid") === "true") mostrar(c, erroDe(c)); });
    });

    function falhou() {
      if (aviso) { aviso.hidden = false; aviso.focus && aviso.setAttribute("tabindex", "-1"); aviso.focus(); }
    }
    function deuCerto() {
      form.classList.add("is-enviado");
      if (sucesso) { sucesso.hidden = false; sucesso.focus(); }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.classList.add("foi-enviado");
      if (aviso) aviso.hidden = true;
      var primeiro = null;
      campos.forEach(function (c) { var m = erroDe(c); mostrar(c, m); if (m && !primeiro) primeiro = c; });
      if (primeiro) { primeiro.focus(); return; }

      var url = form.getAttribute("data-endpoint");
      if (location.hash === "#form-erro") { falhou(); return; }
      if (!url) { deuCerto(); return; }

      var dados = {};
      campos.forEach(function (c) { dados[c.name] = c.value.trim(); });
      dados.pagina = location.pathname;
      botao.disabled = true;
      fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados) })
        .then(function (r) { if (!r.ok) throw new Error(r.status); deuCerto(); })
        .catch(falhou)
        .then(function () { botao.disabled = false; });
    });
  });
})();
