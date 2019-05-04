using Microsoft.EntityFrameworkCore.Migrations;

namespace HolidayRequests.Data.Migrations
{
    public partial class AdddaysOffcolumntoLeaveRequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DaysOff",
                table: "LeaveRequests",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DaysOff",
                table: "LeaveRequests");
        }
    }
}
