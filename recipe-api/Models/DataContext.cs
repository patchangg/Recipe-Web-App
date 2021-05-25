using Microsoft.EntityFrameworkCore;

namespace recipe_api.Models
{
    public class DataContext : DbContext
    {
        public DataContext()
        {
        }
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DbSet<Recipe> Recipes { get; set; }
    }
}