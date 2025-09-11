import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { 
    Coffee, 
    Star, 
    Clock, 
    MapPin, 
    Phone, 
    ChefHat, 
    Users, 
    Award,
    ArrowRight,
    Play,
    Quote,
    Wifi,
    Car,
    CreditCard,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Definisikan tipe data untuk props sliders
interface Slider {
    id: number;
    image_path: string;
    title?: string;
}

interface HomeProps {
    sliders: Slider[];
}

export default function Home({ sliders }: HomeProps) {
    // Data menu unggulan
    const featuredMenu = [
        {
            id: 1,
            name: "Signature Latte",
            description: "Espresso premium dengan steamed milk dan latte art cantik",
            price: "Rp 35.000",
            image: "/storage/menu-unggulan/cireng.jpg",
            rating: 4.9,
            category: "Coffee"
        },
        {
            id: 2,
            name: "Croissant Sandwich",
            description: "Croissant butter dengan smoked salmon dan cream cheese",
            price: "Rp 45.000",
            image: "/storage/menu-unggulan/kopi-butterscotch.jpg",
            rating: 4.8,
            category: "Food"
        },
        {
            id: 3,
            name: "Matcha Cheesecake",
            description: "Creamy cheesecake dengan premium matcha dari Jepang",
            price: "Rp 38.000",
            image: "/storage/menu-unggulan/nasi-goreng.jpg",
            rating: 4.9,
            category: "Dessert"
        }
    ];

    // Data testimoni
    const testimonials = [
        {
            id: 1,
            name: "Sarah Wijaya",
            role: "Food Blogger",
            content: "Tempat yang sempurna untuk meeting dan bersantai. Kopi mereka benar-benar exceptional!",
            rating: 5,
            avatar: "/storage/profile-picture/orang2.jpg"
        },
        {
            id: 2,
            name: "Ahmad Fauzi",
            role: "Entrepreneur",
            content: "Suasananya cozy banget, wifi kenceng, cocok banget buat kerja sambil ngopi.",
            rating: 5,
            avatar: "/storage/profile-picture/orang3.jpg"
        },
        {
            id: 3,
            name: "Lisa Chen",
            role: "Designer",
            content: "Makanannya enak, pelayanan ramah, dan tempatnya instagramable. Recommended!",
            rating: 5,
            avatar: "/storage/profile-picture/orang1.jpg"
        }
    ];

    return (
        <MainLayout>
            <Head title="Selamat Datang - Paddies Cafe" />

            {/* Custom CSS untuk Swiper Navigation */}
            {/* <style jsx>{` */}
            <style>{`
                .custom-swiper .swiper-button-next,
                .custom-swiper .swiper-button-prev {
                    width: 50px;
                    height: 50px;
                    background: rgba(255, 255, 255, 0.9);
                    border-radius: 50%;
                    color: #000;
                    font-size: 18px;
                    font-weight: bold;
                    margin-top: -25px;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                    border: 2px solid rgba(0, 0, 0, 0.1);
                }
                
                .custom-swiper .swiper-button-next:hover,
                .custom-swiper .swiper-button-prev:hover {
                    background: #000;
                    color: #fff;
                    transform: scale(1.1);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                }
                
                .custom-swiper .swiper-button-next::after,
                .custom-swiper .swiper-button-prev::after {
                    font-size: 16px;
                    font-weight: 900;
                }
                
                .custom-swiper .swiper-pagination-bullet {
                    width: 12px;
                    height: 12px;
                    background: rgba(255, 255, 255, 0.5);
                    opacity: 1;
                    margin: 0 6px;
                    transition: all 0.3s ease;
                }
                
                .custom-swiper .swiper-pagination-bullet-active {
                    background: #fff;
                    transform: scale(1.3);
                }
            `}</style>

            {/* Hero Slider Section */}
            <div className="relative w-full">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={{
                        enabled: true,
                    }}
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    effect="fade"
                    className="h-[70vh] md:h-[80vh] custom-swiper"
                    breakpoints={{
                        // Untuk layar kecil (mobile), navigation dinonaktifkan
                        0: {
                            navigation: {
                                enabled: false,
                            }
                        },
                        // Untuk layar medium ke atas (tablet & desktop), navigation diaktifkan
                        768: {
                            navigation: {
                                enabled: true,
                            }
                        }
                    }}
                >
                    {sliders.map((slide) => (
                        <SwiperSlide key={slide.id} className="relative">
                            <img
                                src={`/storage/${slide.image_path}`}
                                alt={slide.title || 'Paddies Cafe Slider Image'}
                                className="w-full h-full object-cover filter grayscale"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/50"></div>
                            
                            {/* Content Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center text-white">
                                <div className="text-center max-w-4xl px-6">
                                    <div className="flex items-center justify-center mb-4">
                                        <Coffee className="h-12 w-12 text-white mr-3" />
                                        <h1 className="text-5xl md:text-7xl font-bold">Paddies Cafe</h1>
                                    </div>
                                    <p className="text-xl md:text-2xl mb-8 text-gray-200">
                                        Tempat terbaik untuk menikmati kopi berkualitas tinggi dan suasana yang nyaman
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <a href="/menu">
                                            <button className="bg-white hover:bg-black hover:text-white text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center border-2 border-white cursor-pointer">
                                                Lihat Menu
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </button>
                                        </a>
                                        <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center cursor-pointer">
                                            <Play className="mr-2 h-5 w-5" />
                                            Virtual Tour
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                
                <style>{`
                    /* Alternative CSS method - uncomment if breakpoints method doesn't work */
                    /*
                    @media (max-width: 767px) {
                        .custom-swiper .swiper-button-next,
                        .custom-swiper .swiper-button-prev {
                            display: none !important;
                        }
                    }
                    */
                `}</style>
            </div>

            {/* Stats Section */}
            <div className="bg-gray-100 py-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="transform hover:scale-105 transition-transform duration-300">
                            <div className="bg-black w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Coffee className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-black mb-2">50+</h3>
                            <p className="text-gray-600">Variasi Menu</p>
                        </div>
                        <div className="transform hover:scale-105 transition-transform duration-300">
                            <div className="bg-black w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-black mb-2">1000+</h3>
                            <p className="text-gray-600">Happy Customers</p>
                        </div>
                        <div className="transform hover:scale-105 transition-transform duration-300">
                            <div className="bg-black w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-black mb-2">5</h3>
                            <p className="text-gray-600">Years Experience</p>
                        </div>
                        <div className="transform hover:scale-105 transition-transform duration-300">
                            <div className="bg-black w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-black mb-2">4.9</h3>
                            <p className="text-gray-600">Rating</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-black mb-6">
                                Tentang <span className="border-b-4 border-black">Paddies Cafe</span>
                            </h2>
                            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                Sejak 2020, Paddies Cafe telah menjadi destinasi favorit para pecinta kopi di Bandung. 
                                Kami berkomitmen untuk menyajikan kopi berkualitas tinggi dari biji pilihan terbaik, 
                                dikombinasikan dengan makanan lezat dan suasana yang hangat dan nyaman.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <ChefHat className="h-6 w-6 text-black mr-3" />
                                    <span className="text-gray-700">Chef berpengalaman dengan resep signature</span>
                                </div>
                                <div className="flex items-center">
                                    <Coffee className="h-6 w-6 text-black mr-3" />
                                    <span className="text-gray-700">100% premium coffee beans</span>
                                </div>
                                <div className="flex items-center">
                                    <Users className="h-6 w-6 text-black mr-3" />
                                    <span className="text-gray-700">Suasana cozy untuk segala acara</span>
                                </div>
                            </div>
                            <button className="mt-8 bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                                Pelajari Lebih Lanjut
                            </button>
                        </div>
                        <div className="relative">
                            <img 
                                src="/storage/gallery/paddies-coeffee-interior.jpg" 
                                alt="About Paddies Cafe" 
                                className="rounded-2xl shadow-2xl w-full filter grayscale hover:grayscale-0 transition-all duration-300"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-black text-white p-6 rounded-xl shadow-lg">
                                <h4 className="font-bold text-lg">Since 2020</h4>
                                <p className="text-gray-300">Melayani dengan cinta</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Menu Section */}
            <div className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-black mb-4">Menu Unggulan</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Nikmati koleksi menu terbaik kami yang dibuat dengan bahan-bahan berkualitas tinggi
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {featuredMenu.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-200">
                                <div className="relative">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-full h-48 object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                                    />
                                    <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        {item.category}
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 flex items-center">
                                        <Star className="h-4 w-4 text-black fill-current" />
                                        <span className="text-sm font-semibold ml-1 text-gray-900">{item.rating}</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-black mb-2">{item.name}</h3>
                                    <p className="text-gray-600 mb-4">{item.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-2xl font-bold text-black">{item.price}</span>
                                        <a href="/shop">
                                            <button className="cursor-pointer bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-300">
                                                Pesan
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-12">
                        <a href="/shop">
                            <button className="cursor-pointer bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 border-2 border-black hover:border-gray-800">
                                Pesan Sekarang
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Facilities Section */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-black mb-4">Fasilitas Unggulan</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Kenyamanan Anda adalah prioritas kami
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8 rounded-2xl bg-gray-100 transform hover:scale-105 transition-all duration-300 hover:bg-black hover:text-white group">
                            <div className="bg-black group-hover:bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                                <Wifi className="h-8 w-8 text-white group-hover:text-black" />
                            </div>
                            <h3 className="text-xl font-bold text-black group-hover:text-white mb-2">Free WiFi</h3>
                            <p className="text-gray-600 group-hover:text-gray-300">Internet cepat untuk bekerja dan browsing</p>
                        </div>
                        
                        <div className="text-center p-8 rounded-2xl bg-gray-100 transform hover:scale-105 transition-all duration-300 hover:bg-black hover:text-white group">
                            <div className="bg-black group-hover:bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                                <Car className="h-8 w-8 text-white group-hover:text-black" />
                            </div>
                            <h3 className="text-xl font-bold text-black group-hover:text-white mb-2">Parking Area</h3>
                            <p className="text-gray-600 group-hover:text-gray-300">Area parkir yang luas dan aman</p>
                        </div>
                        
                        <div className="text-center p-8 rounded-2xl bg-gray-100 transform hover:scale-105 transition-all duration-300 hover:bg-black hover:text-white group">
                            <div className="bg-black group-hover:bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                                <CreditCard className="h-8 w-8 text-white group-hover:text-black" />
                            </div>
                            <h3 className="text-xl font-bold text-black group-hover:text-white mb-2">Cashless Payment</h3>
                            <p className="text-gray-600 group-hover:text-gray-300">Pembayaran digital untuk kemudahan</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-black mb-4">Apa Kata Mereka</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Testimoni dari pelanggan setia Paddies Cafe
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-lg relative transform hover:scale-105 transition-transform duration-300 border border-gray-200">
                                <Quote className="h-8 w-8 text-black mb-4" />
                                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                                <div className="flex items-center">
                                    <img 
                                        src={testimonial.avatar} 
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full mr-4 filter grayscale"
                                    />
                                    <div>
                                        <h4 className="font-bold text-black">{testimonial.name}</h4>
                                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                                <div className="flex mt-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-black fill-current" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact CTA Section */}
            <div className="py-20 bg-black text-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">
                                Kunjungi <span className="border-b-4 border-white">Paddies Cafe</span> Hari Ini!
                            </h2>
                            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                Nikmati pengalaman ngopi yang tak terlupakan bersama keluarga dan teman-teman. 
                                Kami siap melayani Anda dengan sepenuh hati.
                            </p>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center">
                                    <MapPin className="h-6 w-6 text-white mr-3" />
                                    <span>Jl. Raya Paddy No. 123, Bandung</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-6 w-6 text-white mr-3" />
                                    <span>Buka setiap hari 07:00 - 23:00</span>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="h-6 w-6 text-white mr-3" />
                                    <span>+62 22 1234 5678</span>
                                </div>
                            </div>
                            <a href="https://api.whatsapp.com/send/?phone=6287752723783&text&type=phone_number&app_absent=0">
                                <button className="cursor-pointer bg-white hover:bg-gray-200 text-black px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300">
                                    Hubungi Kami
                                </button>
                            </a>
                        </div>
                        
                        <div className="relative">
                            <img 
                                src="/storage/gallery/view1.jpg" 
                                alt="Paddies Cafe Interior" 
                                className="rounded-2xl shadow-2xl w-full filter grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}