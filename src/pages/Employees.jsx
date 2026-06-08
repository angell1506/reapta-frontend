import { useState } from "react";

export default function Employees() {
  const [search, setSearch] = useState("");

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

  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const limparFormulario = () => {
    setForm({
      nome: "",
      email: "",
      cargo: "",
      telefone: "",
      status: "Ativo"
    });

    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setEmployees(
        employees.map((employee) =>
          employee.id === editingId
            ? { ...employee, ...form }
            : employee
        )
      );
    } else {
      const novoFuncionario = {
        id: Date.now(),
        ...form
      };

      setEmployees([...employees, novoFuncionario]);
    }

    limparFormulario();
  };

  const handleEdit = (employee) => {
    setEditingId(employee.id);

    setForm({
      nome: employee.nome,
      email: employee.email,
      cargo: employee.cargo,
      telefone: employee.telefone,
      status: employee.status
    });
  };

  const handleDelete = (id) => {
    const confirmar = window.confirm(
      "Deseja realmente excluir este funcionário?"
    );

    if (!confirmar) return;

    setEmployees(
      employees.filter(
        (employee) => employee.id !== id
      )
    );
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.nome
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Funcionários</h1>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px"
        }}
      >
        <h3>
          {editingId
            ? "Editar Funcionário"
            : "Novo Funcionário"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: "10px"
            }}
          >
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="cargo"
              placeholder="Cargo"
              value={form.cargo}
              onChange={handleChange}
              required
            />

            <input
              type="text"
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
              <option>Ativo</option>
              <option>Inativo</option>
            </select>
          </div>

          <div
            style={{
              marginTop: "15px",
              display: "flex",
              gap: "10px"
            }}
          >
            <button type="submit">
              {editingId
                ? "Atualizar"
                : "Cadastrar"}
            </button>

            <button
              type="button"
              onClick={limparFormulario}
            >
              Limpar
            </button>
          </div>
        </form>
      </div>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px"
        }}
      >
        <input
          type="text"
          placeholder="Pesquisar funcionário..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px"
          }}
        />

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >
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
            {filteredEmployees.map(
              (employee) => (
                <tr key={employee.id}>
                  <td>{employee.nome}</td>
                  <td>{employee.email}</td>
                  <td>{employee.cargo}</td>
                  <td>{employee.telefone}</td>
                  <td>{employee.status}</td>

                  <td>
                    <button
                      onClick={() =>
                        handleEdit(employee)
                      }
                    >
                      Editar
                    </button>

                    <button
                      style={{
                        marginLeft: "10px"
                      }}
                      onClick={() =>
                        handleDelete(
                          employee.id
                        )
                      }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
