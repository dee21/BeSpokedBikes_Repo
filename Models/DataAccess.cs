using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace BeSpokedBikesSalseTrackingApp.Models
{
    public class DataAccess
    {
        public List<Products> ProductList(SqlConnection connection)
        {
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter("select * from Product", connection);
            sqlDataAdapter.SelectCommand.CommandType = System.Data.CommandType.Text;
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Products> prodList = new List<Products>();
            if (dt.Rows.Count > 0 )
            {
                foreach(DataRow dr in dt.Rows )
                {
                    Products pr = new Products();
                    pr.ProductID = (Guid)dr["ProductId"];
                    pr.Name = (string)dr["Name"];
                    prodList.Add(pr);
                }
            }
            return prodList;
        }
    }
}
