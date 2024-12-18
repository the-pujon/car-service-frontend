import { useState, useEffect } from "react";
import { useGetUserTransactionsQuery } from "@/redux/features/transaction/transactionApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Loading from "@/components/ui/Loading";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  _id: string;
  service: {
    name: string;
    price: number;
  };
  transactionId: string;
  amount: string;
  status: string;
  createdAt: string;
}

function MyTransaction() {
  const { data, isLoading, error } = useGetUserTransactionsQuery(undefined);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [olderTransactions, setOlderTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (data?.data) {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
      const recent: Transaction[] = [];
      const older: Transaction[] = [];

      data.data.forEach((transaction: Transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        if (transactionDate > thirtyDaysAgo) {
          recent.push(transaction);
        } else {
          older.push(transaction);
        }
      });

      setRecentTransactions(recent);
      setOlderTransactions(older);
    }
  }, [data]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (error) {
    return <div className="text-center text-red-500">Error loading transactions</div>;
  }

  return (
    <div className="p-4 space-y-6">
      {isLoading && <Loading />}

      {/* Transaction Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700">Total Transactions</h3>
              <p className="text-2xl font-bold">{data?.data?.length || 0}</p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700">Recent (30 days)</h3>
              <p className="text-2xl font-bold">{recentTransactions.length}</p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700">Total Spent</h3>
              <p className="text-2xl font-bold">
                ${data?.data?.reduce((sum: number, transaction: Transaction) => 
                  sum + parseFloat(transaction.amount), 0).toFixed(2) || '0'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No recent transactions
                  </TableCell>
                </TableRow>
              ) : (
                recentTransactions.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                    <TableCell>{transaction.service?.name}</TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">{transaction.transactionId}</span>
                    </TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History (Older than 30 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {olderTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No transaction history
                  </TableCell>
                </TableRow>
              ) : (
                olderTransactions.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                    <TableCell>{transaction.service?.name}</TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">{transaction.transactionId}</span>
                    </TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default MyTransaction;