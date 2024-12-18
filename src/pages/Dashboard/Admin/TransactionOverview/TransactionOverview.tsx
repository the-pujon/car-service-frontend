/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  useGetAllTransactionsQuery,
  useGetServiceWiseTransactionsQuery,
  useGetStatusWiseTransactionsQuery,
//   useGetDateWiseTransactionsQuery,
} from "@/redux/features/transaction/transactionApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Loading from "@/components/ui/Loading";
import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
//   LineChart,
//   Line,
} from "recharts";
import {  ArrowUpRight, ArrowDownRight, DollarSign, Activity } from "lucide-react";
// import { toast } from "sonner";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TransactionOverview = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);

  const { data: allTransactions, isLoading } = useGetAllTransactionsQuery(undefined);
  const { data: serviceWiseData } = useGetServiceWiseTransactionsQuery(undefined);
  const { data: statusWiseData } = useGetStatusWiseTransactionsQuery(undefined);

  // Filter transactions based on date range
  useEffect(() => {
    if (allTransactions?.data && date?.from && date?.to) {
      const filtered = allTransactions.data.filter((transaction: any) => {
        const transactionDate = new Date(transaction.createdAt);
        return transactionDate >= date.from! && transactionDate <= date.to!;
      });
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(allTransactions?.data || []);
    }
  }, [allTransactions?.data, date]);


  if (isLoading) return <Loading />;

  const totalAmount = allTransactions?.data?.reduce(
    (sum: number, transaction: any) => sum + parseFloat(transaction.amount),
    0
  );

  const successfulTransactions = allTransactions?.data?.filter(
    (t: any) => t.status.toLowerCase() === 'completed'
  ).length;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'failed':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };


  return (
    <div className="p-6 space-y-8">
      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
                <h3 className="text-2xl font-bold mt-2">{allTransactions?.data?.length || 0}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-2">${totalAmount?.toFixed(2) || '0'}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-red-600">
              <ArrowDownRight className="w-4 h-4 mr-1" />
              <span>-4% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Successful Transactions</p>
                <h3 className="text-2xl font-bold mt-2">{successfulTransactions || 0}</h3>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <Activity className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-emerald-600">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span>{((successfulTransactions / (allTransactions?.data?.length || 1)) * 100).toFixed(1)}% success rate</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Transaction</p>
                <h3 className="text-2xl font-bold mt-2">
                  ${(totalAmount / (allTransactions?.data?.length || 1)).toFixed(2)}
                </h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Service-wise Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceWiseData?.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="service.name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalAmount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusWiseData?.data}
                    dataKey="totalTransactions"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {statusWiseData?.data?.map((_: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Date Range Filter and Transactions Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Transaction History</CardTitle>
          <DatePickerWithRange date={date} setDate={setDate} />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction: any) => (
                  <TableRow key={transaction._id}>
                    <TableCell>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.service?.name}</TableCell>
                    <TableCell>
                      <span className="font-mono text-sm bg-gray-700/30 px-2 py-1 rounded">
                        {transaction.transactionId}
                      </span>
                    </TableCell>
                    <TableCell>{transaction.customer}</TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    {/* <TableCell>
                      <Select
                        defaultValue={transaction.status}
                        onValueChange={(value) => handleStatusChange(transaction._id, value)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionOverview;