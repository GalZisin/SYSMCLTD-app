using Microsoft.EntityFrameworkCore;
using sysmcltdAPI.Models;

namespace sysmcltdAPI.Data
{
    public class ContactRepository
    {
        private readonly ApplicationDbContext _appDbContext;
        public ContactRepository(ApplicationDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        /// <summary>
        /// Add contact
        /// </summary>
        /// <param name="contact"></param>
        /// <returns></returns>
        public async Task AddContactAsync(AddContact contactModel)
        {
            var contact = await _appDbContext.Contacts.Where(x => x.FullName == contactModel.FullName && x.Email == contactModel.Email).ToListAsync();

            if (contact.Count != 0)
            {
                throw new Exception("Contact already exist");
            }

            var newContact = new Contact
            {
                FullName = contactModel.FullName,
                OfficeNumber = contactModel.OfficeNumber,
                Email = contactModel.Email,
                CustomerId = contactModel.CustomerId,
                IsDeleted = false,
                Created = DateTime.UtcNow // Adding the creation date
            };
            await _appDbContext.Set<Contact>().AddAsync(newContact);
            await _appDbContext.SaveChangesAsync();
        }
        /// <summary>
        /// Get all contact by customerId
        /// </summary>
        /// <param name="customerId"></param>
        /// <returns></returns>
        public async Task<List<Contact>> GetAllContactsByCustomerIdAsync(int customerId)
        {
            var contacts = await _appDbContext.Contacts.Where(contact => contact.CustomerId == customerId).ToListAsync();
            return contacts;
        }
        /// <summary>
        /// Update contact
        /// </summary>
        /// <param name="id"></param>
        /// <param name="contactModel"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task UpdateContactAsync(int id, UpdateContact contactModel)
        {
            var contact = await _appDbContext.Contacts.FindAsync(id) ?? throw new Exception("Contact not found");
            contact.FullName = contactModel.FullName;
            contact.OfficeNumber = contactModel.OfficeNumber;
            contact.Email = contactModel.Email;
            await _appDbContext.SaveChangesAsync();
        }
        /// <summary>
        /// Delete contact (logical)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public async Task DeleteContactAsnyc(int id)
        {
            var contact = await _appDbContext.Contacts.FindAsync(id) ?? throw new Exception("Contact not found");
            contact.IsDeleted = true;
            await _appDbContext.SaveChangesAsync();
        }
    }
}
