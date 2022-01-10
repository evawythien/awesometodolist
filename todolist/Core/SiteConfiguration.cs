using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using todolist.Repository;

namespace todolist.Core
{
    public static class SiteConfiguration
    {
        public static IServiceCollection ConfigureDataBase(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<DBOptions>(config.GetSection(nameof(DBOptions)))
                    .AddScoped(sp => sp.GetRequiredService<IOptions<DBOptions>>().Value);

            services.AddScoped(services =>
            {
                DBOptions options = services.GetRequiredService<DBOptions>();
                return new MongoClient(options.ConnectionString);
            });

            services.AddScoped(services =>
            {
                DBOptions options = services.GetRequiredService<DBOptions>();
                return services.GetRequiredService<MongoClient>().GetDatabase(options.DatabaseName);
            });

            services.AddScoped(services =>
            {
                DBOptions options = services.GetRequiredService<DBOptions>();
                return new DutyRepository(services.GetRequiredService<IMongoDatabase>(), options.CollectionName);
            });

            return services;
        }
    }
}
