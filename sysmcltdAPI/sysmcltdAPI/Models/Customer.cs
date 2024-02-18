using System.ComponentModel.DataAnnotations.Schema;

namespace sysmcltdAPI.Models
{
    public class Customer
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public required string Name { get; set; }
        public required long CustomerNumber { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime Created { get; set; }

        //navigation properties
        public ICollection<Address>? Addresses { get; set; } // 1 to many
        public ICollection<Contact>? Contacts { get; set; } // 1 to many
    }

    public class AddCustomer
    {
        public required string Name { get; set; }
        public required long CustomerNumber { get; set; }
    }

    public class UpdateCustomer
    {
        public required string Name { get; set; }
        public required long CustomerNumber { get; set; }
    }
}
