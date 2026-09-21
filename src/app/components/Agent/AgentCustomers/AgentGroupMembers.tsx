// src/app/components/Agent/AgentCustomers/AgentGroupMembers.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { customerService, CustomerWithGroup } from "@/services/agent/customerService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function AgentGroupMembers() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState<CustomerWithGroup[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<CustomerWithGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteCustomerId, setDeleteCustomerId] = useState<number | null>(null);
  const [deleteCustomerName, setDeleteCustomerName] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState(false);
  const dataFetchedRef = useRef(false);

  const fetchGroupMembers = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const data = await customerService.getCustomersWithGroups();
      console.log("✅ Fetched data:", data);
      setMembers(data || []);
      setFilteredMembers(data || []);
    } catch (err: any) {
      console.error("❌ Failed to fetch group members:", err);
      toast.error(err?.message || "Failed to load group members");
      setMembers([]);
      setFilteredMembers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Search filter - runs on searchTerm or members change
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredMembers(members);
      return;
    }
    const lowerSearch = searchTerm.toLowerCase().trim();
    const filtered = members.filter(
      (m) =>
        (m.group_name?.toLowerCase() || "").includes(lowerSearch) ||
        (m.customer_name?.toLowerCase() || "").includes(lowerSearch)
    );
    setFilteredMembers(filtered);
  }, [searchTerm, members]);

  // Fetch data ONLY when dialog opens, and ONLY ONCE
  useEffect(() => {
    if (open && !dataFetchedRef.current) {
      dataFetchedRef.current = true;
      fetchGroupMembers();
    }
    // Reset the flag when dialog closes
    if (!open) {
      dataFetchedRef.current = false;
    }
  }, [open]);

  const handleDelete = async () => {
    if (!deleteCustomerId) return;
    setIsDeleting(true);
    try {
      await customerService.removeCustomerFromGroup(deleteCustomerId);
      toast.success("Customer removed from group successfully");
      setMembers((prev) => prev.filter((m) => m.customer_id !== deleteCustomerId));
      setFilteredMembers((prev) => prev.filter((m) => m.customer_id !== deleteCustomerId));
      setDeleteCustomerId(null);
      setDeleteCustomerName("");
    } catch (err: any) {
      toast.error(err?.message || "Failed to remove customer from group");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearchTerm("");
    setDeleteCustomerId(null);
    setDeleteCustomerName("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Users className="h-4 w-4" /> Check Group Members
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-5xl max-h-[90vh] p-0 flex flex-col"
        onInteractOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <div className="px-6 pt-6 pb-2 flex-shrink-0">
          <DialogTitle>Group Members</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            View all customers grouped by their groups
          </p>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-3 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by group name or customer name..."
              className="pl-9 pr-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">Loading group members...</p>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <Users className="h-12 w-12 mb-2 opacity-50" />
              <p>{searchTerm ? "No matching group members found" : "No group members found"}</p>
              <p className="text-sm">Add customers to groups to see them here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[60px] text-center">S.No</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead className="hidden md:table-cell">Phone</TableHead>
                    <TableHead className="hidden lg:table-cell">Email</TableHead>
                    <TableHead className="hidden sm:table-cell">Company</TableHead>
                    <TableHead>Group Name</TableHead>
                    <TableHead className="hidden xl:table-cell">Group Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member, index) => (
                    <TableRow key={member.customer_id}>
                      <TableCell className="text-center text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium">{member.customer_name}</TableCell>
                      <TableCell className="hidden md:table-cell">{member.phone || "-"}</TableCell>
                      <TableCell className="hidden lg:table-cell">{member.email || "-"}</TableCell>
                      <TableCell className="hidden sm:table-cell">{member.company_name || "-"}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 text-primary" />
                          {member.group_name}
                        </span>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell text-muted-foreground truncate max-w-[200px]">
                        {member.group_description || "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => {
                            setDeleteCustomerId(member.customer_id);
                            setDeleteCustomerName(member.customer_name);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          {!isLoading && filteredMembers.length > 0 && (
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredMembers.length} of {members.length} group members
            </div>
          )}
        </div>

        <div className="px-6 pb-6 pt-2 flex-shrink-0 border-t">
          <Button
            className="w-full bg-red-500 text-white hover:bg-red-600"
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </DialogContent>

      <AlertDialog
        open={!!deleteCustomerId}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteCustomerId(null);
            setDeleteCustomerName("");
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove from Group</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>{deleteCustomerName}</strong> from their group?
              <br />
              <span className="text-muted-foreground text-sm">
                The customer will remain in your customers list, but they will no longer be part of this group.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
              disabled={isDeleting}
            >
              {isDeleting ? "Removing..." : "Remove from Group"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}