// Mockup/src/app/components/Agent/AgentDashboard/AgentWalletBalance.tsx

"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { walletService } from "@/services/agent/walletService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AgentWalletBalance() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  const fetchWalletBalance = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("access_token") || "";

      if (!token) {
        setError("Unable to load wallet balance. Login token was not found.");
        toast.error("Session expired. Please login again.", {
          position: "top-right",
          duration: 3000,
        });
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedInType");
        router.push("/login");
        return;
      }

      const data = await walletService.getWalletBalance();
      setBalance(data.wallet_balance || 0);
    } catch (err: any) {
      console.error("Failed to fetch wallet balance:", err);
      setError(
        err?.message ||
          "Unable to load wallet balance. Please try again later."
      );

      if (err?.message?.includes("401") || err?.message?.includes("expired")) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loggedInType");
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-IN");
  };

  if (error) {
    return (
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600">
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
      className="h-full"
    >
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 h-full flex flex-col">
        <CardHeader className="flex-row items-center justify-between flex-wrap gap-2 pb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/20">
              <Wallet className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-base">Wallet Balance</CardTitle>
          </div>
          <Button
            size="sm"
            className="gap-1"
            onClick={() => router.push("/Agent/wallet")}
          >
            <TrendingUp className="h-3 w-3" /> View Wallet
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between">
          <div className="text-center py-4">
            {loading ? (
              <motion.p
                className="text-4xl font-bold text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Loading...
              </motion.p>
            ) : (
              <motion.p
                className="text-4xl font-bold text-gray-800"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                ₹{formatCurrency(balance)}
              </motion.p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Available for withdrawal
            </p>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => router.push("/Agent/wallet")}
            >
              Withdraw
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => router.push("/Agent/wallet")}
            >
              Transaction History
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}