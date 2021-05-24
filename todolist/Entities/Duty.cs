using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace todolist.Entities
{
    public class Duty
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public bool Completed { get; set; }
    }
}
