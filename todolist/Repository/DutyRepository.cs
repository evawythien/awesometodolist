using MongoDB.Driver;

namespace todolist.Repository
{
    public class DutyRepository
    {
        private readonly IMongoDatabase mongoDatabase;


        private readonly string collectionName;

        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="mongoDatabase"></param>
        public DutyRepository(IMongoDatabase mongoDatabase, string collectionName)
        {
            this.mongoDatabase = mongoDatabase;
            this.collectionName = collectionName;
        }

        public IMongoCollection<T> GetCollection<T>()
        {
            return this.mongoDatabase.GetCollection<T>(this.collectionName);
        }
    }
}
