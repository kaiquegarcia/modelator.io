export default {
  namespaced: true,
  state: {
    name: "My Diagram",
    tables: [],
    scale: 1.0
  },
  mutations: {
    name: (state, name) => {
      state.name = name;
    },
    addTable: (state, { tableId, table }) => {
      state.tables.push({
        id: tableId,
        name: table?.name || "",
        description: table?.description || "",
        engine: table?.engine || "",
        columns: [],
        indexes: [],
        foreignKeys: []
      });
    },
    tableName: (state, { tableIndex, name }) => {
      state.tables[tableIndex].name = name;
    },
    tableDescription: (state, { tableIndex, description }) => {
      state.tables[tableIndex].description = description;
    },
    tableEngine: (state, { tableIndex, engine }) => {
      state.tables[tableIndex].engine = engine;
    },
    addTableColumn: (state, { tableIndex, column }) => {
      state.tables[tableIndex].columns.push({
        name: column?.name || "",
        dataType: column?.dataType || "",
        defaultExpression: column?.defaultExpression || "",
        PK: column?.PK || false,
        AI: column?.AI || false,
        NN: column?.NN || false,
        UQ: column?.UQ || false,
        UN: column?.UN || false,
        ZF: column?.ZF || false,
        B: column?.B || false,
        FK: column?.FK || null
      });
    },
    tableColumnName: (state, { tableIndex, columnIndex, name }) => {
      state.tables[tableIndex].columns[columnIndex].name = name;
    },
    tableColumnDataType: (state, { tableIndex, columnIndex, dataType }) => {
      state.tables[tableIndex].columns[columnIndex].name = dataType;
    },
    tableColumnDefaultExpression: (
      state,
      { tableIndex, columnIndex, defaultExpression }
    ) => {
      state.tables[tableIndex].columns[columnIndex].name = defaultExpression;
    },
    tableColumnPrimaryKey: (state, { tableIndex, columnIndex, PK }) => {
      state.tables[tableIndex].columns[columnIndex].PK = Boolean(PK);
    },
    tableColumnAutoIncrement: (state, { tableIndex, columnIndex, AI }) => {
      state.tables[tableIndex].columns[columnIndex].AI = Boolean(AI);
    },
    tableColumnNotNull: (state, { tableIndex, columnIndex, NN }) => {
      state.tables[tableIndex].columns[columnIndex].NN = Boolean(NN);
    },
    tableColumnUnique: (state, { tableIndex, columnIndex, UQ }) => {
      state.tables[tableIndex].columns[columnIndex].UQ = Boolean(UQ);
    },
    tableColumnUnsigned: (state, { tableIndex, columnIndex, UN }) => {
      state.tables[tableIndex].columns[columnIndex].UN = Boolean(UN);
    },
    tableColumnZeroFilled: (state, { tableIndex, columnIndex, ZF }) => {
      state.tables[tableIndex].columns[columnIndex].ZF = Boolean(ZF);
    },
    tableColumnBinary: (state, { tableIndex, columnIndex, B }) => {
      state.tables[tableIndex].columns[columnIndex].B = Boolean(B);
    },
    tableColumnForeignKey: (state, { tableIndex, columnIndex, FK }) => {
      state.tables[tableIndex].columns[columnIndex].FK = FK;
    },
    scale: (state, scale) => {
      if (scale > 1) {
        scale = 1.0;
      } else if (scale < 0.1) {
        scale = 0.1;
      }
      state.scale = scale;
    },
    deleteTable: (state, tableIndex) => {
      delete state.tables[tableIndex];
    },
    deleteTableColumn: (state, { tableIndex, columnIndex }) => {
      state.tables[tableIndex].columns.splice(columnIndex, 1);
    },
    columns: (state, { tableIndex, columns }) => {
      state.tables[tableIndex].columns = columns;
    }
  },
  actions: {
    addTable({ state, commit }, tableId) {
      commit("addTable", {
        tableId,
        table: {
          name: "table_name"
        }
      });
      let tableIndex = state.tables.length - 1;
      commit("addTableColumn", {
        tableIndex,
        column: {
          name: "id",
          dataType: "INT(11)",
          PK: true,
          AI: true
        }
      });
      commit("addTableColumn", {
        tableIndex,
        column: {
          name: "status",
          dataType: "ENUM('draft', 'published')",
          defaultExpression: "'draft'",
          NN: true
        }
      });
      commit("addTableColumn", {
        tableIndex,
        column: {
          name: "deleted_at",
          dataType: "DATETIME"
        }
      });
      commit("addTableColumn", {
        tableIndex,
        column: {
          name: "updated_at",
          dataType: "DATETIME"
        }
      });
      commit("addTableColumn", {
        tableIndex,
        column: {
          name: "created_at",
          dataType: "TIMESTAMP",
          defaultExpression: "CURRENT_TIMESTAMP",
          NN: true
        }
      });
    },
    updateTable({ commit }, { tableIndex, table }) {
      commit("tableName", { tableIndex, name: table?.name });
      commit("tableDescription", {
        tableIndex,
        description: table?.description
      });
      commit("tableEngine", { tableIndex, engine: table?.engine });
    },
    addTableColumn({ state, commit }, tableIndex) {
      commit("addTableColumn", {
        tableIndex,
        column: {
          name: "row_" + (state.tables[tableIndex].columns.length + 1)
        }
      });
    },
    updateTableColumn({ commit }, { tableIndex, columnIndex, column }) {
      commit("tableColumnName", {
        tableIndex,
        columnIndex,
        name: column?.name
      });
      commit("tableColumnDataType", {
        tableIndex,
        columnIndex,
        dataType: column?.dataType
      });
      commit("tableColumnDefaultExpression", {
        tableIndex,
        columnIndex,
        defaultExpression: column?.defaultExpression
      });
      commit("tableColumnPrimaryKey", {
        tableIndex,
        columnIndex,
        PK: column?.PK
      });
      commit("tableColumnAutoIncrement", {
        tableIndex,
        columnIndex,
        AI: column?.AI
      });
      commit("tableColumnNotNull", { tableIndex, columnIndex, NN: column?.NN });
      commit("tableColumnUnique", { tableIndex, columnIndex, UQ: column?.UQ });
      commit("tableColumnUnsigned", {
        tableIndex,
        columnIndex,
        UN: column?.UN
      });
      commit("tableColumnZeroFilled", {
        tableIndex,
        columnIndex,
        ZF: column?.ZF
      });
      commit("tableColumnBinary", { tableIndex, columnIndex, B: column?.B });
      commit("tableColumnForeignKey", {
        tableIndex,
        columnIndex,
        FK: column?.FK
      });
    },
    zoomIn({ state, commit }) {
      commit("scale", state.scale + 0.1);
    },
    zoomOut({ state, commit }) {
      commit("scale", state.scale - 0.1);
    },
    deleteTable({ commit }, tableIndex) {
      commit("deleteTable", tableIndex);
    },
    deleteTableColumn({ commit }, { tableIndex, columnIndex }) {
      commit("deleteTableColumn", { tableIndex, columnIndex });
    },
    assignTableColumnsOrder({ commit }, { tableIndex, columns }) {
      commit("columns", { tableIndex, columns });
    }
  }
};
