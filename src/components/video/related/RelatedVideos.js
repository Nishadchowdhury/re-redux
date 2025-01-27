import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ id, title }) {

    const { data: relatedVideos, isLoading, isError } = useGetRelatedVideosQuery({ id, title })

    

    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {videos<RelatedVideo />}
        </div>
    );
}
