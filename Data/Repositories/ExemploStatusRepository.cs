using Dapper;
using Data.Constantes;
using Data.Interfaces;
using Data.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class ExemploStatusRepository : IExemploStatusRepository
    {
        private readonly Func<IDbConnection> _connection;
        private readonly ILogger<ExemploStatus> _log;
        private readonly IExportarExcel _exportarExcel;

        public ExemploStatusRepository(Func<IDbConnection> connection,
            ILogger<ExemploStatus> log,
            IExportarExcel exportarExcel)
        {
            _connection = connection;
            _log = log;
            _exportarExcel = exportarExcel;
        }
        public async Task<IEnumerable<ExemploStatus>> GetAll()
        {
            try
            {
                string sql_script = @"
                    SELECT
                    Id, 
                    Descricao
                    FROM ExemploStatus
                ";

                var exemploStatus = new List<ExemploStatus>();

                using (IDbConnection connection = _connection.Invoke())
                {
                    exemploStatus = (await connection.QueryAsync<ExemploStatus>(sql_script)).ToList();
                }
                return exemploStatus;
            }
            catch (Exception ex)
            {
                _log.LogError(ex, Resources.ERRO_REPOSITORIO);
                return null;
            }
        }
    }
}
