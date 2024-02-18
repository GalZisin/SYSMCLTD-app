using Microsoft.EntityFrameworkCore;
using sysmcltdAPI.Models;

namespace sysmcltdAPI.Data
{
    public class AddressRepository
    {
        private readonly ApplicationDbContext _appDbContext;
        public AddressRepository(ApplicationDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        /// <summary>
        /// Add address
        /// </summary>
        /// <param name="addressModel"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task AddAddressAsync(AddAddress addressModel)
        {
            var address = await _appDbContext.Addresses.Where(x => x.City == addressModel.City && x.Street == addressModel.Street).ToListAsync();
            if (address.Count != 0)
            {
                throw new Exception("Address already exist");
            }

            var newAddress = new Address
            {
                City = addressModel.City,
                Street = addressModel.Street,
                CustomerId = addressModel.CustomerId,
                IsDeleted = false,
                Created = DateTime.UtcNow // Adding the creation date
            };
            await _appDbContext.Set<Address>().AddAsync(newAddress);
            await _appDbContext.SaveChangesAsync();
        }
        /// <summary>
        /// Get all addressses by customer Id
        /// </summary>
        /// <param name="customerId"></param>
        /// <returns></returns>
        public async Task<List<Address>> GetAllAddressesByCustomerIdAsync(int customerId)
        {
            var addresses = await _appDbContext.Addresses.Where(address => address.CustomerId == customerId).ToListAsync();
            return addresses;
        }
        /// <summary>
        /// Upate address
        /// </summary>
        /// <param name="id"></param>
        /// <param name="addressModel"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task UpdateAddressAsync(int id, UpdateAddress addressModel)
        {
            var address = await _appDbContext.Addresses.FindAsync(id) ?? throw new Exception("Address not found");
            address.City = addressModel.City;
            address.Street = addressModel.Street;
            await _appDbContext.SaveChangesAsync();
        }
        /// <summary>
        /// Delete address
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task DeleteAddressAsnyc(int id)
        {
            var address = await _appDbContext.Addresses.FindAsync(id) ?? throw new Exception("Address not found");
            address.IsDeleted = true;
            await _appDbContext.SaveChangesAsync();
        }
    }
}
