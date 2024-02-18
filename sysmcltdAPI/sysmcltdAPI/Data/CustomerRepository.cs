using Microsoft.EntityFrameworkCore;
using sysmcltdAPI.Models;

namespace sysmcltdAPI.Data
{
    public class CustomerRepository
    {
        private readonly ApplicationDbContext _appDbContext;

        public CustomerRepository(ApplicationDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        /// <summary>
        /// Add customer
        /// </summary>
        /// <param name="customer"></param>
        /// <returns></returns>
        public async Task AddCustomerAsync(AddCustomer customerModel)
        {
            //var customer = await _appDbContext.Customers.FindAsync(customerModel.Name);
            var customer = await _appDbContext.Customers.Where(x => x.Name == customerModel.Name || x.CustomerNumber == customerModel.CustomerNumber).ToListAsync();

            if (customer.Count != 0)
            {
                throw new Exception("Customer already exist");
            }

            var newCustomer = new Customer
            {
                Name = customerModel.Name,
                CustomerNumber = customerModel.CustomerNumber,
                IsDeleted = false,
                Created = DateTime.UtcNow // Adding the creation date
            };

            await _appDbContext.Set<Customer>().AddAsync(newCustomer);
            await _appDbContext.SaveChangesAsync();
        }
        /// <summary>
        /// Get all customers
        /// </summary>
        /// <returns></returns>
        public async Task<List<Customer>> GetAllCustomersAsync()
        {
            return await _appDbContext.Customers
          .Where(c => !c.IsDeleted)
          .ToListAsync();
        }
        /// <summary>
        /// Get customer by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<Customer> GetCustomerDataByIdAsync(int customerId)
        {
            var customerData = _appDbContext.Customers
         .Where(c => c.Id == customerId)
         .Select(c => new Customer
         {
             Id = c.Id,
             Name = c.Name,
             CustomerNumber = c.CustomerNumber,
             Contacts = c.Contacts!.Where(contact => !contact.IsDeleted).ToList(), // Assuming Contacts is a navigation property
             Addresses = c.Addresses!.Where(address => !address.IsDeleted).ToList() // Assuming Addresses is a navigation property
         })
         .FirstOrDefault();

            return Task.FromResult(customerData ?? throw new Exception("Customer not found"));
        }
        /// <summary>
        /// Update customer details
        /// </summary>
        /// <param name="id"></param>
        /// <param name="customerModel"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task UpdateCustomerAsync(int id, UpdateCustomer customerModel)
        {
            var customer = await _appDbContext.Customers.FindAsync(id) ?? throw new Exception("Customer not found");
            customer.Name = customerModel.Name;
            customer.CustomerNumber = customerModel.CustomerNumber;
            await _appDbContext.SaveChangesAsync();
        }
        /// <summary>
        /// Delete customer (logical)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task DeleteCustomerAsnyc(int id)
        {
            var customer = await _appDbContext.Customers.FindAsync(id) ?? throw new Exception("Customer not found");
            customer.IsDeleted = true;
            await _appDbContext.SaveChangesAsync();
        }
    }
}
