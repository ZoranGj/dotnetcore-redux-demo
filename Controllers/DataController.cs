using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using DotnetcReduxDemo.Models;

namespace WebApplicationBasic.Controllers
{
    [Route("api/[controller]")]
    public class DataController : Controller
    {
		private readonly Random _randomGenerator;

		public DataController()
		{
			_randomGenerator = new Random();
		}

		[HttpGet("[action]")]
		public IEnumerable<OrgUnit> Units() 
		{
			return Enumerable.Range(0, 12)
							.Select(id => new OrgUnit {
								Id = id,
								Name = $"Organisation Unit {id}"
							});
		}

		[HttpGet("[action]")]
		public IEnumerable<Activity> Activities(int orgUnitId)
		{
			return Enumerable.Range(orgUnitId, 30)
							.Select(a => 
							{
								int id = _randomGenerator.Next(3000);
								return new Activity {
									Id = id,
									Name = string.Format("[{1}] Activity name {0}", id, orgUnitId),
									Description = string.Format("Description {0}, description {0}{0}{0} description", id)
								};
							});
		}
    }
}
