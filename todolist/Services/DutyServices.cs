using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using todolist.Entities;
using todolist.Repository;

namespace todolist.Services
{
    public class DutyServices
    {
        private readonly IMongoCollection<Duty> dutys;

        public DutyServices(DutyRepository mongo)
        {
            this.dutys = mongo.GetCollection<Duty>();
        }

        public IEnumerable<Duty> Get()
        {
            return this.dutys.Find(duty => true).ToList();
        }

        public Duty Get(string id)
        {
            return this.dutys.Find(duty => duty.Id == id).FirstOrDefault();
        }

        public Duty Create(Duty duty)
        {
            this.dutys.InsertOne(duty);
            return duty;
        }

        public void Update(string id, Duty bookIn)
        {
            this.dutys.ReplaceOne(duty => duty.Id == id, bookIn);
        }

        public void Remove(string id)
        {
            this.dutys.DeleteOne(duty => duty.Id == id);
        }
    }
}
