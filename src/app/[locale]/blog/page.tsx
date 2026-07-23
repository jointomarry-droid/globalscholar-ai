import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  TrendingUp,
  Globe,
} from "lucide-react";

const featuredPost = {
  title: "The Ultimate Guide to International Scholarships in 2026",
  excerpt: "Everything you need to know about finding, applying for, and winning international scholarships this year.",
  category: "Guides",
  date: "2026-01-15",
  readTime: "12 min read",
  slug: "ultimate-guide-international-scholarships-2026",
};

const posts = [
  {
    title: "Top 10 Fully Funded Scholarships for African Students",
    excerpt: "Discover the best fully funded scholarship opportunities available to students from African countries.",
    category: "Scholarships",
    date: "2026-01-10",
    readTime: "8 min read",
    slug: "top-fully-funded-scholarships-african-students",
  },
  {
    title: "How to Write a Winning Statement of Purpose",
    excerpt: "Expert tips and templates for crafting a compelling SOP that stands out from the competition.",
    category: "Essay Tips",
    date: "2026-01-08",
    readTime: "10 min read",
    slug: "writing-winning-statement-of-purpose",
  },
  {
    title: "Erasmus Mundus vs Chevening: Which is Right for You?",
    excerpt: "A comprehensive comparison of two of the world's most prestigious scholarship programs.",
    category: "Comparisons",
    date: "2026-01-05",
    readTime: "7 min read",
    slug: "erasus-mundus-vs-chevening",
  },
  {
    title: "Understanding IELTS Requirements for Scholarships",
    excerpt: "A complete guide to IELTS score requirements across different scholarship programs and countries.",
    category: "Test Prep",
    date: "2026-01-03",
    readTime: "6 min read",
    slug: "ielts-requirements-scholarships",
  },
  {
    title: "5 Common Mistakes in Scholarship Applications",
    excerpt: "Avoid these pitfalls that cause thousands of qualified students to miss out on funding every year.",
    category: "Tips",
    date: "2026-01-01",
    readTime: "5 min read",
    slug: "common-mistakes-scholarship-applications",
  },
  {
    title: "Scholarship Deadlines to Watch in Q1 2026",
    excerpt: "Don't miss these important scholarship deadlines in January, February, and March 2026.",
    category: "Deadlines",
    date: "2025-12-28",
    readTime: "4 min read",
    slug: "scholarship-deadlines-q1-2026",
  },
];

const categories = [
  { name: "Guides", count: 24, icon: BookOpen },
  { name: "Scholarships", count: 156, icon: Globe },
  { name: "Essay Tips", count: 18, icon: Sparkles },
  { name: "Test Prep", count: 12, icon: TrendingUp },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Scholarship Insights</h1>
            <p className="text-[var(--muted-foreground)]">
              Expert advice, guides, and news to help you navigate the world of international scholarships
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        <Link href={`/blog/${featuredPost.slug}`}>
          <Card className="mb-12 hover:shadow-lg transition-all cursor-pointer group overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="bg-gradient-to-br from-[var(--primary)]/10 to-transparent p-8 flex items-center justify-center">
                  <BookOpen className="h-24 w-24 text-[var(--primary)] opacity-30" />
                </div>
                <div className="p-8">
                  <Badge className="mb-3">{featuredPost.category}</Badge>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-[var(--primary)] transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-[var(--muted-foreground)] mb-4">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Posts Grid */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="hover:shadow-md transition-all cursor-pointer group h-full">
                    <CardContent className="p-5">
                      <Badge variant="secondary" className="text-xs mb-3">
                        {post.category}
                      </Badge>
                      <h3 className="font-semibold mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-[var(--accent)] transition-colors text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <cat.icon className="h-4 w-4 text-[var(--primary)]" />
                        {cat.name}
                      </span>
                      <Badge variant="outline" className="text-xs">{cat.count}</Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[var(--primary)]/5 to-transparent border-[var(--primary)]/20">
              <CardContent className="p-5">
                <h3 className="font-semibold mb-2">Stay Updated</h3>
                <p className="text-sm text-[var(--muted-foreground)] mb-4">
                  Get the latest scholarship opportunities and tips delivered to your inbox.
                </p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 rounded-lg border border-[var(--input)] bg-[var(--background)] text-sm mb-3"
                />
                <Button className="w-full" size="sm">
                  Subscribe
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
