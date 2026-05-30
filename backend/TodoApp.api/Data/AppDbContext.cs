using Microsoft.EntityFrameworkCore;
using TodoApp.api.Models;
namespace TodoApp.api.Data;

public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}
  public DbSet<TodoItem> TodoItems => Set<TodoItem>();
}
