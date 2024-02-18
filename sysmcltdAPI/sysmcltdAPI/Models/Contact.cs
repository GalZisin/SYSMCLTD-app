using System.ComponentModel.DataAnnotations.Schema;

namespace sysmcltdAPI.Models
{
    public class Contact
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? FullName { get; set; }
        public string? OfficeNumber { get; set; }
        public string? Email { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime Created { get; set; }
        public int CustomerId { get; set; }
        //navigation properties
        public Customer? Customer { get; set; }
    }
    public class AddContact
    {
        public required string FullName { get; set; }
        public string? OfficeNumber { get; set; }
        public string? Email { get; set; }
        public int CustomerId { get; set; }
    }
    public class UpdateContact
    {
        public string? FullName { get; set; }
        public string? OfficeNumber { get; set; }
        public string? Email { get; set; }
    }
}
