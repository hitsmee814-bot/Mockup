"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp } from "lucide-react";

export function AgentWalletBalance() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
      className="h-full" /* 1. Tells Framer Motion to fill the grid height track */
    >
      {/* 2. Added h-full and flex layouts to stretch the card body cleanly */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 h-full flex flex-col justify-between">
        
        <div>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/20">
                  <Wallet className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-base">Wallet Balance</CardTitle>
              </div>
              <Button size="sm" className="gap-1">
                <TrendingUp className="h-3 w-3" /> Recharge
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="text-center py-4">
              <motion.p
                className="text-4xl font-bold text-gray-800"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                ₹12,500
              </motion.p>
              <p className="text-xs text-muted-foreground mt-1">
                Available for withdrawal
              </p>
            </div>
          </CardContent>
        </div>

        {/* 3. Wrap your original buttons in a padded container anchored to the bottom */}
        <div className="p-6 pt-0 mt-auto">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Withdraw
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Transaction History
            </Button>
          </div>
        </div>

      </Card>
    </motion.div>
  );
}