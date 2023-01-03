class Funcionario {
  constructor() {
    this.id = 1;
    this.arreyFuncionarios = [];
    this.editId = null;
  }

  salvar() {
    let funcionario = this.lerDados();
    let msgm = document.getElementById("msgm");
    msgm.innerText = "";

    if (this.validaCampos(funcionario)) {
      if (this.editId == null) {
        this.adicionar(funcionario);
      } else {
        this.atualizar(this.editId, funcionario);
      }
    }

    this.listaTabela();
    this.cancelar();
  }
  listaTabela() {
    let tbody = document.getElementById("tbody");
    tbody.innerText = "";

    for (let i = 0; i < this.arreyFuncionarios.length; i++) {
      let tr = tbody.insertRow();

      let td_id = tr.insertCell();
      let td_funcionario = tr.insertCell();
      let td_telefone = tr.insertCell();
      let td_salario = tr.insertCell();
      let td_acoes = tr.insertCell();

      td_id.innerText = this.arreyFuncionarios[i].id;
      td_funcionario.innerText = this.arreyFuncionarios[i].nomeFuncionario;
      td_telefone.innerText = this.arreyFuncionarios[i].telefone;
      td_salario.innerText = this.arreyFuncionarios[i].salario;

      td_id.classList.add("center");
      td_acoes.classList.add("center");

      let imgEdit = document.createElement("img");
      imgEdit.src = "./Img/editar-arquivo.png";
      imgEdit.setAttribute(
        "onclick",
        "funcionario.editar(" + JSON.stringify(this.arreyFuncionarios[i]) + ")"
      );

      let imgDelete = document.createElement("img");
      imgDelete.src = "./Img/delete-user.png";
      imgDelete.setAttribute(
        "onclick",
        "funcionario.deletar(" + this.arreyFuncionarios[i].id + ")"
      );

      td_acoes.appendChild(imgEdit);
      td_acoes.appendChild(imgDelete);
    }
  }
  adicionar(funcionario) {
    funcionario.telefone = funcionario.telefone;
    funcionario.salario = funcionario.salario;
    funcionario.rsalarial = funcionario.rsalarial;
    this.arreyFuncionarios.push(funcionario);
    this.id++;
  }
  async atualizar(id, funcionario) {
    try {
      let rea = parseInt(document.getElementById("rsalarial").value);
      let sal = parseFloat(document.getElementById("salario").value);
      let nome = document.getElementById("funcionario").value;
      let resul = await ((sal * rea) / 100);
      let som = resul + sal;

      if (rea < 0) {
        throw "O reajuste salarial deve ser positivo!";
      } else if (resul) {
        setTimeout(
          () =>
            (document.getElementById("msgm").innerHTML =
              "O salario atual era R$" +
              sal +
              ".\nCom o almento  de " +
              rea +
              "%, o salário vai aumentar R$" +
              resul +
              " no próximo mês.\nE a partir daí, " +
              nome +
              " vai passar a ganhar R$" +
              som +
              "."),
          3000
        );
      }

      for (let i = 0; i < this.arreyFuncionarios.length; i++) {
        if (this.arreyFuncionarios[i].id == id) {
          this.arreyFuncionarios[i].nomeFuncionario =
            funcionario.nomeFuncionario;
          this.arreyFuncionarios[i].telefone = funcionario.telefone;
          this.arreyFuncionarios[i].salario = som;
          this.arreyFuncionarios[i].rsalarial = rsalarial;
        }
      }

      this.listaTabela(); 
    } catch (error) {
      document.getElementById("msgm").innerHTML =
        "O reajuste salarial deve ser positivo!";
    }
  }
  editar(dados) {
    this.editId = dados.id;

    document.getElementById("funcionario").value = dados.nomeFuncionario;
    document.getElementById("telefone").value = dados.telefone;
    document.getElementById("salario").value = dados.salario;
    document.getElementById("rsalarial").value = dados.rsalarial;

    document.getElementById("btn1").innerText = "Atualizar";
  }
  lerDados() {
    let funcionario = {};
    funcionario.id = this.id;
    funcionario.nomeFuncionario = document.getElementById("funcionario").value;
    funcionario.telefone = document.getElementById("telefone").value;
    funcionario.salario = document.getElementById("salario").value;
    funcionario.rsalarial = document.getElementById("rsalarial").value;

    return funcionario;
  }
  validaCampos(funcionario) {
    let msg = "";

    if (funcionario.nomeFuncionario == "") {
      msg += "-Informe o nome do funcionário\n";
    }
    if (funcionario.telefone == "") {
      msg += "-Informe o telefone do funcionário\n";
    }
    if (funcionario.salario == "") {
      msg += "-Informe o salário do funcionário\n";
    }
    if (funcionario.rsalarial == "") {
      msg += "-Informe o reajuste salaria do funcionário\n";
    }
    if (msg != "") {
      alert(msg);
      return false;
    }

    return true;
  }

  cancelar() {
    document.getElementById("funcionario").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("salario").value = "";
    document.getElementById("rsalarial").value = "";

    document.getElementById("btn1").innerText = "Salvar";
    this.editId = null;
  }
  deletar(id) {
    if (confirm("Deseja realmente deletar o funcionário do ID " + id + " ?"));

    let tbody = document.getElementById("tbody");

    for (let i = 0; i < this.arreyFuncionarios.length; i++) {
      if (this.arreyFuncionarios[i].id == id) {
        this.arreyFuncionarios.splice(i, 1);
        tbody.deleteRow(i);
      }
    }

    document.getElementById("funcionario").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("salario").value = "";
    document.getElementById("rsalarial").value = "";

    document.getElementById("btn1").innerText = "Salvar";
    document.getElementById("msgm").innerHTML = "";
  }
}

var funcionario = new Funcionario();
