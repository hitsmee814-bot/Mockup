// src/app/components/Agent/AgentCustomers/AgentCreateGroup.tsx

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertCircle, Users, X } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { groupService, AgentGroup } from "@/services/agent/groupService";
import { cn } from "@/lib/utils";

export function AgentCreateGroup() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<AgentGroup[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isNewGroupName, setIsNewGroupName] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchGroups = useCallback(async (query: string) => {
    if (!query || query.trim().length === 0) {
      setSearchResults([]);
      setShowSuggestions(false);
      setIsNewGroupName(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await groupService.searchGroups(query.trim(), 10);
      setSearchResults(results);
      setShowSuggestions(results.length > 0);
      
      // Check if the entered name is new (not in search results)
      const exactMatch = results.some(
        (g) => g.group_name.toLowerCase() === query.trim().toLowerCase()
      );
      setIsNewGroupName(!exactMatch && query.trim().length > 0);
    } catch (err) {
      console.error("Failed to search groups:", err);
      setSearchResults([]);
      setShowSuggestions(false);
      setIsNewGroupName(false);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGroupName(value);
    setError(null);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchGroups(value);
    }, 300);
  };

  const handleSelectSuggestion = (group: AgentGroup) => {
    setGroupName(group.group_name);
    setShowSuggestions(false);
    setSearchResults([]);
    setIsNewGroupName(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".group-suggestions-container")) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!groupName.trim()) {
      setError("Group name is required");
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // Check if group name already exists in search results
    const exists = searchResults.some(
      (g) => g.group_name.toLowerCase() === groupName.trim().toLowerCase()
    );

    if (exists) {
      setError("This Group Name already exists. Please use another Group Name.");
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await groupService.createGroup({
        group_name: groupName.trim(),
        description: description.trim() || undefined,
      });

      toast.success("Group created successfully!");
      setOpen(false);
      setGroupName("");
      setDescription("");
      setSearchResults([]);
      setShowSuggestions(false);
      setIsNewGroupName(false);
    } catch (err: any) {
      console.error("Failed to create group:", err);
      
      const errorMsg = err?.message || "Failed to create group. Please try again.";
      if (errorMsg.includes("already exists") || errorMsg.includes("another Group Name")) {
        setError("This Group Name already exists. Please use another Group Name.");
      } else {
        setError(errorMsg);
      }
      
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setError(null);
    setGroupName("");
    setDescription("");
    setSearchResults([]);
    setShowSuggestions(false);
    setIsNewGroupName(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5 bg-blue-500 text-white hover:bg-blue-600">
          <Users className="h-4 w-4" /> Create Group
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-lg max-h-[90vh] p-0 flex flex-col"
        onInteractOutside={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <div className="px-6 pt-6 pb-2 flex-shrink-0">
          <DialogTitle>Create New Group</DialogTitle>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-6 py-2"
        >
          <AnimatePresence>
            {open && (
              <>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4"
                  >
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="grid gap-4"
                  noValidate
                >
                  <div className="space-y-1.5 group-suggestions-container relative">
                    <Label htmlFor="groupName">
                      Group Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        ref={inputRef}
                        id="groupName"
                        name="groupName"
                        placeholder="Enter group name (e.g., Family Trip 2025)"
                        value={groupName}
                        onChange={handleGroupNameChange}
                        onFocus={() => {
                          if (groupName.trim().length > 0 && searchResults.length > 0) {
                            setShowSuggestions(true);
                          }
                        }}
                        className={cn(
                          "pr-8",
                          error && !groupName.trim() ? "border-red-500" : ""
                        )}
                        autoComplete="off"
                      />
                      {groupName && (
                        <button
                          type="button"
                          onClick={() => {
                            setGroupName("");
                            setShowSuggestions(false);
                            setSearchResults([]);
                            setIsNewGroupName(false);
                            if (inputRef.current) {
                              inputRef.current.focus();
                            }
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {showSuggestions && searchResults.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto"
                        >
                          {isSearching ? (
                            <div className="px-4 py-2 text-sm text-muted-foreground">
                              Searching...
                            </div>
                          ) : (
                            searchResults.map((group) => (
                              <button
                                key={group.group_id}
                                type="button"
                                onClick={() => handleSelectSuggestion(group)}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2"
                              >
                                <Users className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                <span className="truncate">{group.group_name}</span>
                              </button>
                            ))
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Blue message for NEW group name only */}
                    {isNewGroupName && !showSuggestions && groupName.trim().length > 0 && (
                      <p className="text-xs text-blue-500 mt-1">
                        This is a new group name. Click "Create Group" to create it.
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Any additional details about this group..."
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px] max-h-[150px]"
                      style={{
                        resize: "vertical",
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                        overflowY: "auto",
                      }}
                    />
                  </div>
                </form>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="px-6 pb-6 pt-2 flex-shrink-0 border-t">
          <div className="flex gap-3">
            <Button
              className="flex-1 bg-red-500 text-white hover:bg-red-600"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
              onClick={(e) => {
                if (formRef.current) {
                  formRef.current.dispatchEvent(
                    new Event("submit", { cancelable: true, bubbles: true })
                  );
                }
              }}
            >
              {isLoading ? "Creating..." : "Create Group"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}