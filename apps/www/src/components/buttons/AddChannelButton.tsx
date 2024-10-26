"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createChannel } from "@/actions/create-channel";
import { toast } from "sonner";

import { Button } from "@dingify/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@dingify/ui/components/dialog";
import { Input } from "@dingify/ui/components/input";
import { Label } from "@dingify/ui/components/label";

export function AddChannelButton() {
  const [channelName, setChannelName] = useState("");
  const [providerType, setProviderType] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await createChannel(channelName,providerType,url);

      if (!result.success) {
        throw new Error(result.error || "Failed to add channel");
      }

      toast.success(`Channel "${channelName}" created successfully.`);

      // Optionally, you can refresh the page or navigate to the new channel
      router.push(`/dashboard/channels/${result.channel?.id}`);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // return (
  //   <Dialog>
  //     <DialogTrigger asChild>
  //       <Button variant="default" disabled={isLoading}>
  //         Add New Channel
  //       </Button>
  //     </DialogTrigger>
  //     <DialogContent className="sm:max-w-[425px]">
  //       <form onSubmit={handleSubmit} className="space-y-4">
  //         <DialogHeader>
  //           <DialogTitle>Add new channel</DialogTitle>
  //           <DialogDescription>
  //             Enter the name of the new channel.
  //           </DialogDescription>
  //         </DialogHeader>
  //         <div className="grid gap-4 pt-4">
  //           <div className="grid grid-cols-4 items-center gap-4">
  //             <Label htmlFor="channelName" className="col-span-1 text-right">
  //               Channel Name
  //             </Label>
  //             <Input
  //               id="channelName"
  //               name="channelName"
  //               placeholder="Channel Name..."
  //               className="col-span-3"
  //               value={channelName}
  //               onChange={(e) => setChannelName(e.target.value)}
  //               required
  //               disabled={isLoading}
  //             />
  //           </div>
  //         </div>
  //         <DialogFooter>
  //           <Button
  //             type="submit"
  //             disabled={isLoading}
  //             className="w-full sm:w-auto"
  //           >
  //             {isLoading ? "Saving..." : "Save new channel"}
  //           </Button>
  //         </DialogFooter>
  //       </form>
  //     </DialogContent>
  //   </Dialog>
  // );


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" disabled={isLoading}>
          Add New Provider
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add new provider</DialogTitle>
            <DialogDescription>
              Enter the name of the new provider.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 pt-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="channelName" className="col-span-1 text-center">
                Provider Name
              </Label>
              <Input
                id="channelName"
                name="channelName"
                placeholder="Channel Name..."
                className="col-span-3"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="ProviderType" className="col-span-1 text-center">
                Provider Type
              </label>
              <select
                name="ProviderType"
                value={providerType}
                onChange={(e) => setProviderType(e.target.value)}
                className="block col-span-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-gray-500"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Ollama">Ollama</option>
                <option value="LLM">LLM</option>
              </select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="col-span-1 text-center">
                Url
              </Label>
              <Input
                id="url"
                name="url"
                placeholder="Url"
                className="col-span-3"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? "Saving..." : "Save new channel"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
