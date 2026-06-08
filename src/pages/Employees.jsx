import { useState } from "react";

export default function Employees() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      nome: "João Silva",
      email: "joao@empresa.com",
      cargo: "Vendedor",
      telefone: "(61) 99999-9999",
      status: "Ativo"
    }
  ]);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    cargo: "",
    telefone: "",
    status: "Ativo"
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const novoFuncionario = {
      id: Date.now(),
      ...form
    };

    setEmployees([...employees, novoFuncionario]);

    setForm({
      nome: "",
      email: "",
      cargo: "",
      telefone: "",
      status: "Ativo"
    });
  }

  function deleteEmployee(id) {
    setEmployees(
      employees.filter((item) => item.id !== id)
    );
  }

  return (
    <div className="container">
      <h1>Gerenciamento de Funcionários</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="cargo"
          placeholder="Cargo"
          value={form.cargo}
          onChange={handleChange}
          required
        />

        <input
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </select>

        <button type="submit">
          Adicionar Funcionário
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Telefone</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.nome}</td>
              <td>{employee.email}</td>
              <td>{employee.cargo}</td>
              <td>{employee.telefone}</td>
              <td>{employee.status}</td>

              <td>
                <button
                  onClick={() =>
                    deleteEmployee(employee.id)
                  }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
