using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using FIT_Api_Examples.Data;
using FIT_Api_Examples.Helper;
using FIT_Api_Examples.Helper.AutentifikacijaAutorizacija;
using FIT_Api_Examples.Modul2.Models;
using FIT_Api_Examples.Modul3.Models;
using FIT_Api_Examples.Modul4_MaticnaKnjiga.Models;
using FIT_Api_Examples.Modul4_MaticnaKnjiga.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FIT_Api_Examples.Modul4_MaticnaKnjiga.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]/[action]")]
    public class MaticnaKnjigaController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public MaticnaKnjigaController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public class MaticnaKnjigaGetVM
        {
            public int id{ get; set; }
            public string ime{ get; set; }
            public string prezime{ get; set; }
            public string broj_indeksa { get; set; }
            public List<UpisUAkGodinu> upisaneAkGodine { get; set; }
            public List<CmbStavke> cmbStavkeAkademskeGodine { get; set; }
        }
        
        [HttpGet]
        public ActionResult<MaticnaKnjigaGetVM> GetByStudent(int id)
        {
            //if (!HttpContext.GetLoginInfo().isPermisijaStudentskaSluzba)
            //    return BadRequest("nije logiran");
            
            Student s = _dbContext.Student
                .Include(x=>x.opstina_rodjenja)
                .SingleOrDefault(x =>x.id ==id);

            if (s==null)
                return BadRequest("pogresan ID");

            var result = new MaticnaKnjigaGetVM
            {
                broj_indeksa = s.broj_indeksa,
                id =  s.id,
                ime = s.ime,
                prezime = s.prezime,
                upisaneAkGodine = _dbContext.UpisUAkGodinu
                    .Include(x=>x.akademskaGodina)
                    .Include(x=>x.evidentiraoKorisnik)
                    .Where(x=>x.studentId==id).ToList(),
                cmbStavkeAkademskeGodine = _dbContext.AkademskaGodina.Select(x=>new CmbStavke {
                    opis = x.opis,
                    id = x.id
                }).ToList()
            };

            return result;
        }

        public class MaticnaKnjigaAkGodinuZimskiUpisVM
        {
            public DateTime datum { get; set; }
            public int studentId { get; set; }
            public int godinaStudija { get; set; }
            public int akademskaGodinaId { get; set; }
            public float? cijenaSkolarine { get; set; }
            public bool obnovaGodine { get; set; }
            
           
        }

        [HttpPost]
        public ActionResult AkGodinuZimskiUpis([FromBody] MaticnaKnjigaAkGodinuZimskiUpisVM x)
        {
            //if (!HttpContext.GetLoginInfo().isPermisijaProdekan)
            //    return BadRequest("nije logiran");

            var novi = new UpisUAkGodinu();
            _dbContext.Add(novi);
            
            novi.datum1_ZimskiUpis = x.datum;
            novi.studentId = x.studentId;
            novi.godinaStudija = x.godinaStudija;
            novi.akademskaGodinaId = x.akademskaGodinaId;
            novi.cijenaSkolarine = x.cijenaSkolarine;
            novi.obnovaGodine = x.obnovaGodine;
            novi.evidentiraoKorisnik = HttpContext.GetLoginInfo()?.korisnickiNalog;
            novi.evidentiraoKorisnikId = 1;
            _dbContext.SaveChanges();
            
            return Ok(novi.id);
        }

        public class MaticnaKnjigaAkGodinuZimskiOvjeraVM
        {
            public DateTime datum { get; set; }
        }
        [HttpPost]
        public ActionResult AkGodinuZimskiOvjera(int id, [FromBody] MaticnaKnjigaAkGodinuZimskiOvjeraVM x)
        {
            //if (!HttpContext.GetLoginInfo().isPermisijaProdekan)
            //    return BadRequest("nije logiran");

            UpisUAkGodinu upisUAkGodinu = _dbContext.UpisUAkGodinu.SingleOrDefault(s => s.id == id);
            if (upisUAkGodinu == null)
                return BadRequest("pogresan id");

            if (upisUAkGodinu.datum1_ZimskiUpis == null)
                return BadRequest("ne mozete ovjeriti semestar bez upisa");

            if (upisUAkGodinu.datum1_ZimskiUpis > x.datum)
                return BadRequest("ne mozete datum ovjeriti biti prije datuma upisa");

            upisUAkGodinu.datum2_ZimskiOvjera = x.datum;
            upisUAkGodinu.evidentiraoKorisnik = HttpContext.GetLoginInfo()?.korisnickiNalog;
            _dbContext.SaveChanges();

            return Ok(upisUAkGodinu.id);
        }
    }
}
