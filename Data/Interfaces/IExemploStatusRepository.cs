using Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface IExemploStatusRepository
    {
        Task<IEnumerable<ExemploStatus>> GetAll();
    }
}
