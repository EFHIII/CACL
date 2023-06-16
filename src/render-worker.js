'use strict';
let canvas, ctx, canvasImage;

let imageData, width, height;
let fillStyle = {r: 0, g: 0, b: 0, a: 1};

importScripts('drawingFunctions.js');

const voidAndClusterMatrix = [
[313, 3860, 1349, 2329, 1092, 2738, 4022, 899, 2105, 3731, 1906, 2615, 1147, 3605, 1428, 3267, 1587, 2985, 1940, 1374, 3703, 2024, 432, 2360, 824, 3766, 1347, 3055, 1609, 1118, 444, 3107, 122, 3277, 669, 2065, 256, 1418, 3316, 1887, 2714, 1227, 2593, 371, 1434, 3710, 2229, 766, 1272, 3432, 2768, 969, 3635, 338, 4033, 1006, 3572, 1573, 2832, 4009, 1302, 2416, 1518, 3611],
[2555, 2010, 3227, 626, 3363, 1508, 2522, 498, 2926, 92, 2463, 828, 3090, 2133, 693, 1015, 3472, 608, 3997, 249, 1744, 3082, 3870, 1435, 2930, 2605, 1971, 241, 2231, 3949, 1789, 2584, 1365, 2332, 3642, 1476, 2989, 3584, 411, 2189, 687, 3498, 1805, 4017, 2079, 991, 2674, 3093, 4058, 1589, 124, 2991, 2002, 2211, 785, 2708, 195, 3056, 459, 1110, 3194, 587, 3407, 1060],
[3098, 800, 1641, 2823, 2195, 206, 1979, 3836, 1223, 3246, 1363, 3913, 193, 1650, 3812, 2319, 1873, 2574, 876, 3218, 2801, 538, 966, 3412, 151, 1207, 3262, 1044, 2839, 806, 3230, 919, 3862, 480, 1756, 2690, 829, 1142, 2835, 3748, 1030, 2361, 277, 3151, 628, 3305, 32, 1964, 573, 2482, 3816, 1091, 404, 3753, 1728, 3146, 1328, 2070, 3654, 2281, 1847, 2755, 167, 1780],
[1188, 3500, 21, 4051, 851, 3583, 3033, 981, 2287, 592, 1738, 2210, 2885, 3356, 481, 2758, 133, 3758, 1522, 2171, 1170, 2540, 2107, 1666, 2259, 3971, 654, 3490, 2049, 3784, 186, 1903, 2786, 1198, 3464, 10, 4085, 2466, 1696, 147, 3225, 1606, 2928, 1350, 2737, 1718, 1204, 3563, 2907, 872, 1774, 2629, 3282, 1470, 2457, 527, 3878, 1626, 878, 53, 3824, 1378, 2222, 3961],
[436, 2387, 1893, 1253, 2591, 1446, 415, 1823, 3417, 2680, 3683, 303, 1109, 2007, 918, 3116, 1256, 2424, 770, 3638, 0, 4089, 323, 3586, 750, 2746, 1503, 2475, 392, 1401, 2410, 3530, 757, 3040, 2151, 1009, 1957, 552, 3078, 2099, 1284, 3899, 493, 3622, 836, 3866, 2131, 464, 2295, 1383, 3684, 673, 2094, 89, 3493, 2938, 1148, 2375, 3447, 2650, 961, 3317, 688, 2898],
[3672, 936, 2696, 3712, 286, 3290, 2436, 3990, 153, 1552, 787, 3523, 2532, 1468, 4055, 1783, 3433, 354, 2906, 1855, 3313, 1576, 3013, 1289, 3176, 1817, 48, 3716, 1706, 2964, 557, 1636, 2288, 307, 3817, 2536, 3359, 1520, 3700, 740, 3389, 911, 2264, 1913, 2525, 239, 3235, 1665, 3981, 175, 2346, 3175, 1257, 2847, 748, 1909, 281, 3248, 614, 1748, 2970, 357, 2494, 1597],
[2137, 3180, 562, 2084, 2974, 743, 1668, 1164, 2796, 1955, 3007, 1308, 3202, 63, 2718, 570, 2053, 3939, 1342, 2669, 1081, 627, 1925, 2642, 491, 3912, 2128, 934, 3125, 1151, 4060, 2656, 1261, 3574, 1583, 381, 1312, 2763, 216, 2397, 1782, 2641, 78, 3052, 1482, 3454, 1107, 2807, 927, 3396, 1876, 317, 3927, 1038, 2251, 4064, 2569, 1276, 2155, 3995, 1412, 1972, 3788, 224],
[1477, 1713, 3920, 1333, 1026, 3482, 2047, 3143, 653, 3781, 386, 2367, 711, 3599, 2249, 1193, 3046, 987, 2299, 422, 3537, 2460, 3839, 892, 2328, 1237, 3448, 2565, 288, 3346, 1936, 93, 3165, 859, 2887, 2029, 3205, 946, 3938, 2956, 446, 3796, 1175, 4048, 703, 2427, 361, 2044, 2579, 596, 3006, 1500, 2686, 1689, 3360, 840, 1536, 3702, 141, 3112, 508, 3554, 1011, 3044],
[728, 3428, 99, 2852, 2345, 472, 3875, 46, 2635, 1068, 1844, 3965, 2845, 1690, 846, 3855, 1623, 161, 3693, 3148, 1714, 217, 1463, 3242, 116, 2941, 582, 1555, 2813, 701, 2205, 3894, 1843, 2442, 622, 4023, 105, 2246, 1870, 1450, 1057, 2169, 2825, 1621, 1985, 3667, 1319, 3841, 1568, 3527, 1165, 3782, 482, 3608, 213, 3068, 423, 2772, 1078, 2038, 2444, 1216, 2788, 2301],
[4090, 1125, 2537, 1871, 3751, 1399, 2243, 1590, 3565, 2152, 3388, 232, 1385, 2095, 3274, 274, 2505, 2961, 1965, 814, 2185, 3382, 2853, 1021, 3746, 1762, 3982, 2015, 998, 3612, 1445, 513, 1064, 3688, 1733, 1127, 3439, 2608, 586, 3119, 3549, 326, 3332, 537, 3187, 137, 2966, 793, 3109, 13, 2144, 2407, 950, 2020, 2516, 1798, 2199, 3510, 1655, 3904, 807, 3384, 35, 1804],
[2663, 399, 3085, 862, 247, 3336, 908, 2918, 1234, 543, 2483, 958, 3718, 463, 2597, 1052, 3477, 1414, 530, 2764, 4034, 1134, 708, 2083, 2401, 1379, 408, 3069, 2521, 172, 3419, 2720, 3000, 231, 3288, 2351, 1386, 781, 3652, 2006, 1249, 2558, 881, 2325, 996, 2667, 1836, 2233, 1069, 2745, 734, 3323, 1437, 2922, 624, 3847, 1338, 707, 2875, 332, 2607, 1921, 3264, 636],
[1299, 3618, 2178, 1527, 3224, 1765, 2570, 330, 4046, 3126, 1496, 2781, 1915, 3173, 1539, 4003, 679, 2142, 3794, 1301, 79, 1833, 3648, 2707, 267, 3508, 2267, 794, 3809, 1672, 2314, 1332, 2073, 1497, 2679, 430, 3877, 2850, 1657, 22, 3992, 1545, 3476, 1749, 3957, 1422, 3598, 294, 4080, 1734, 3738, 1939, 111, 4015, 1196, 3133, 66, 3299, 2333, 1459, 3647, 895, 1579, 3835],
[2908, 1998, 524, 4007, 2711, 674, 3661, 2022, 803, 2394, 120, 3823, 632, 2278, 30, 2877, 1772, 3341, 311, 2357, 3097, 2586, 451, 1599, 3295, 1184, 2872, 1877, 1093, 3196, 353, 4005, 731, 3760, 968, 2140, 1815, 291, 3251, 2458, 678, 2756, 197, 2902, 418, 2491, 649, 3261, 1293, 2866, 393, 2549, 3200, 1605, 2285, 866, 2719, 1861, 999, 3969, 182, 3001, 2257, 298],
[2413, 1046, 3532, 1262, 82, 2309, 1138, 3060, 1730, 3511, 1285, 1803, 3324, 1157, 3617, 883, 2418, 1211, 1658, 3552, 951, 1483, 3883, 1993, 604, 4067, 36, 3670, 647, 2163, 3321, 902, 2910, 55, 3095, 3519, 1213, 3031, 848, 2215, 3769, 1356, 2109, 3714, 1136, 3380, 2074, 1647, 2371, 898, 3483, 1367, 545, 3440, 272, 3719, 1988, 3587, 568, 2500, 2104, 1159, 3474, 1681],
[3160, 154, 2468, 1933, 3372, 1632, 3893, 187, 2749, 993, 2198, 2994, 350, 2625, 1950, 3075, 500, 3906, 2820, 742, 2226, 3222, 843, 2988, 2449, 1317, 2627, 1535, 2778, 1974, 1273, 2499, 1625, 2377, 1916, 639, 2543, 1570, 3405, 1043, 1938, 499, 3156, 818, 1896, 60, 3043, 564, 3895, 222, 2186, 1825, 2822, 1120, 2655, 1702, 379, 1239, 2953, 1549, 3214, 448, 2734, 765],
[1429, 3734, 822, 2814, 932, 2947, 597, 1442, 3285, 441, 3928, 760, 1613, 4083, 203, 1449, 2687, 2031, 104, 3739, 1898, 366, 3467, 181, 1697, 3136, 865, 3399, 331, 3959, 135, 3556, 473, 3846, 1111, 3633, 164, 4077, 374, 2790, 3915, 1189, 2306, 3294, 2617, 3821, 1525, 2710, 1219, 3084, 3677, 977, 3945, 2439, 776, 3018, 4070, 2363, 3415, 666, 1769, 3774, 1355, 4030],
[2077, 3028, 1819, 3946, 373, 2119, 3457, 2511, 1981, 2653, 1345, 2450, 3409, 1086, 2321, 3675, 935, 3255, 1567, 1114, 2921, 2547, 1246, 2062, 3595, 485, 2237, 1807, 3041, 1167, 2601, 1779, 3145, 1413, 2739, 1716, 2933, 2055, 1465, 2392, 118, 2992, 1685, 266, 1397, 719, 3540, 1023, 2467, 1763, 453, 2117, 43, 1513, 3802, 2061, 1402, 134, 922, 3884, 2585, 4, 2213, 494],
[2639, 268, 1197, 2353, 1565, 3808, 1104, 718, 3763, 12, 3573, 2071, 580, 2894, 1868, 394, 3444, 658, 2488, 3950, 561, 2124, 4016, 1035, 2754, 1433, 3859, 973, 2344, 547, 3707, 821, 2193, 252, 3367, 572, 924, 3219, 761, 3504, 1849, 3606, 955, 4032, 2883, 2033, 2268, 152, 4001, 690, 2979, 3351, 2600, 3239, 490, 1033, 3170, 2843, 2164, 1839, 1096, 2805, 3357, 972],
[1506, 3257, 3594, 555, 3190, 220, 2230, 2863, 1695, 1226, 3102, 279, 3204, 834, 3844, 1368, 2175, 3009, 1737, 258, 3374, 1400, 17, 2658, 695, 3771, 219, 2949, 3486, 2091, 1369, 2828, 4044, 1018, 2280, 2644, 3732, 1242, 2159, 460, 2695, 615, 2568, 1793, 355, 3426, 1260, 2799, 1970, 3579, 1453, 831, 1880, 1287, 2245, 3521, 246, 1637, 3308, 349, 3560, 607, 1897, 3691],
[2884, 697, 1724, 2550, 1372, 2982, 1886, 479, 3640, 869, 1830, 3984, 1519, 2556, 1673, 2731, 68, 3157, 1268, 2382, 1795, 3694, 3057, 1635, 3189, 1944, 2432, 767, 1505, 72, 3265, 1593, 403, 3453, 1961, 1304, 28, 2512, 3975, 1602, 3342, 1329, 3857, 1098, 2419, 3745, 518, 3138, 1563, 327, 2320, 3869, 190, 3632, 631, 2699, 1171, 3932, 753, 2527, 1320, 3091, 2383, 113],
[1072, 2265, 3977, 57, 3423, 1005, 4074, 1485, 3241, 2370, 2787, 1032, 2271, 159, 3516, 1176, 4040, 792, 3629, 1003, 2793, 616, 905, 2302, 389, 1146, 3334, 1743, 3921, 2889, 664, 2477, 1862, 3064, 710, 3900, 2972, 1759, 304, 3106, 871, 2227, 83, 3025, 789, 1629, 2174, 914, 3223, 2535, 1087, 2911, 2012, 2765, 1712, 3062, 1945, 2425, 1479, 3658, 2028, 854, 1615, 3854],
[3132, 1962, 1275, 2762, 2051, 782, 2430, 2693, 136, 1311, 410, 3723, 684, 2943, 2101, 515, 1989, 2606, 433, 2254, 3814, 1550, 3281, 3528, 1888, 4094, 149, 2562, 1055, 2003, 3798, 1217, 3657, 188, 2414, 1533, 529, 3588, 2023, 1153, 2860, 1949, 3682, 1487, 3272, 235, 2733, 4088, 18, 1344, 3410, 741, 1588, 414, 4038, 884, 75, 3754, 531, 2935, 209, 4054, 2684, 428],
[3496, 312, 3331, 646, 3704, 1642, 340, 3864, 2143, 3019, 3480, 1905, 3311, 976, 3780, 1323, 3352, 1489, 2967, 1853, 126, 2508, 1079, 299, 2855, 1352, 2212, 3576, 456, 2685, 284, 3207, 887, 2114, 1083, 3307, 2806, 982, 2338, 3785, 207, 3185, 589, 2484, 1902, 3494, 1178, 1809, 3650, 2647, 581, 3787, 2403, 3287, 1380, 2298, 3450, 1248, 2626, 1753, 3390, 1140, 1415, 2129],
[2489, 943, 1791, 2614, 1182, 3545, 3071, 912, 1751, 620, 1131, 2472, 1584, 320, 2334, 2824, 227, 3888, 735, 3461, 1221, 3972, 2042, 2703, 825, 3024, 593, 1292, 3128, 1678, 2316, 1475, 2726, 4013, 2582, 1660, 345, 3471, 652, 1439, 2664, 1701, 1013, 3951, 437, 2942, 670, 2359, 988, 1674, 2127, 3115, 103, 1061, 2963, 302, 2090, 3153, 709, 2203, 396, 2322, 3045, 797],
[1669, 3902, 2927, 177, 2294, 507, 2009, 1406, 3393, 2592, 3916, 39, 3139, 2671, 1767, 3582, 894, 2428, 2156, 347, 3100, 1721, 523, 3607, 1604, 2396, 3727, 2130, 941, 3943, 808, 3434, 504, 1340, 98, 3834, 2248, 1882, 3004, 4056, 747, 3395, 2290, 1278, 2594, 2082, 1419, 3891, 3050, 372, 3973, 1206, 1918, 3553, 1787, 3711, 964, 1541, 3988, 3263, 1017, 3820, 27, 3623],
[1306, 462, 1467, 3292, 3793, 1058, 2837, 4025, 245, 2190, 749, 1967, 1425, 4065, 540, 1067, 1651, 3226, 1390, 2874, 960, 2578, 3404, 87, 3872, 1172, 243, 2811, 3361, 6, 2977, 1832, 3621, 2046, 2924, 775, 1199, 3233, 47, 1362, 2135, 391, 3569, 127, 3811, 810, 3364, 171, 1858, 2849, 857, 2218, 2677, 660, 2554, 475, 2827, 2474, 160, 1865, 2782, 1521, 1930, 2856],
[2395, 4004, 2170, 724, 1851, 2517, 94, 1603, 3183, 1245, 3615, 2903, 819, 2234, 3273, 2027, 3039, 52, 4010, 1923, 3756, 672, 2196, 1451, 1978, 3243, 1802, 721, 1416, 1928, 2461, 1132, 623, 3159, 1582, 3544, 2619, 931, 2447, 3697, 2752, 1741, 2829, 1554, 1995, 3167, 1123, 2256, 3616, 506, 1498, 3468, 276, 3843, 1443, 3337, 1648, 815, 3514, 1225, 559, 2575, 3430, 599],
[3209, 129, 1214, 2742, 3164, 850, 3668, 2340, 574, 2725, 1710, 370, 3832, 1200, 174, 3698, 641, 2621, 1122, 468, 1530, 2355, 3171, 877, 2916, 413, 3497, 2528, 3994, 3086, 369, 3765, 2179, 225, 2365, 425, 1816, 3886, 1511, 492, 1071, 3301, 844, 3088, 549, 2429, 316, 2776, 1309, 2506, 3247, 1729, 2892, 1106, 2342, 37, 3923, 2998, 1984, 3770, 3104, 257, 2067, 900],
[1814, 2990, 3729, 1558, 292, 2959, 1920, 1336, 3365, 953, 3502, 2406, 1540, 2534, 2774, 1821, 1295, 3539, 2087, 2744, 3646, 199, 1251, 4053, 2634, 1027, 2276, 1517, 544, 994, 1707, 2660, 1282, 4069, 2783, 1041, 3376, 157, 2900, 1982, 3985, 259, 2531, 1235, 4024, 1773, 3524, 1611, 3762, 91, 944, 4062, 768, 2040, 3179, 1281, 2157, 933, 343, 2273, 1388, 4093, 1119, 3575],
[378, 2225, 990, 3460, 2093, 1100, 3952, 417, 2567, 2057, 108, 3081, 705, 3435, 445, 3958, 2293, 287, 3122, 762, 1688, 3300, 2453, 315, 1645, 3674, 115, 2761, 3822, 2241, 3518, 691, 3320, 1770, 858, 3665, 1457, 2207, 3113, 609, 2373, 1639, 2097, 3636, 1, 2960, 906, 637, 2058, 3012, 1959, 2454, 1358, 3662, 443, 3585, 612, 2721, 1722, 2905, 675, 2446, 1692, 2705],
[3837, 1351, 2636, 536, 2459, 3535, 681, 1775, 3873, 1160, 3749, 1455, 2122, 1010, 2984, 1577, 856, 3344, 2481, 1361, 3931, 584, 1879, 3003, 786, 2106, 3383, 1186, 2016, 180, 2861, 1559, 62, 2076, 3034, 300, 2552, 727, 1314, 3752, 1145, 3421, 683, 2713, 1394, 2201, 3908, 2612, 3315, 1168, 571, 3402, 205, 2757, 1834, 2631, 1571, 3880, 3375, 1047, 3685, 69, 3234, 774],
[196, 3349, 1735, 4036, 20, 1509, 2261, 3051, 214, 1874, 2851, 486, 3998, 3195, 9, 1947, 3799, 1045, 1785, 139, 2931, 2066, 1090, 3555, 1330, 3910, 648, 3066, 1382, 3270, 916, 3867, 2504, 3193, 1224, 2296, 3934, 1908, 3487, 2637, 336, 2869, 1841, 963, 3216, 420, 1050, 1526, 248, 3942, 2286, 1664, 3076, 1004, 4011, 138, 2384, 1156, 228, 2113, 3035, 1461, 2330, 1598],
[2019, 2867, 634, 1973, 3096, 827, 3314, 2789, 1384, 3253, 888, 2646, 1680, 1274, 2379, 2709, 554, 2173, 2834, 3849, 937, 3418, 2676, 25, 2798, 1758, 2389, 339, 2573, 3708, 442, 1953, 1102, 577, 3566, 1671, 474, 3256, 77, 1546, 2149, 3852, 194, 3720, 1935, 3456, 2390, 2919, 1885, 2694, 362, 3806, 704, 2192, 1474, 3141, 842, 3296, 2524, 1904, 514, 3484, 875, 3935],
[2497, 1173, 3651, 1258, 2675, 3804, 1036, 335, 2366, 602, 3637, 2206, 270, 3567, 799, 3681, 1404, 3470, 358, 1614, 2327, 427, 1499, 3736, 2221, 495, 3215, 1846, 751, 1622, 2337, 2958, 4035, 1407, 2688, 798, 2936, 1007, 2036, 3017, 879, 1210, 3129, 2312, 780, 1686, 114, 3692, 738, 1424, 3203, 1244, 2566, 3501, 489, 2001, 3724, 1334, 729, 3967, 2596, 1291, 2808, 439],
[967, 3275, 263, 2412, 470, 1661, 2132, 4082, 1624, 3401, 1992, 1085, 2951, 1840, 2501, 192, 3016, 1154, 3232, 726, 4086, 3162, 1963, 838, 1139, 4021, 1269, 3601, 2730, 3449, 1059, 264, 1867, 3411, 131, 3792, 1732, 2405, 4084, 558, 3592, 2486, 1376, 522, 4047, 2580, 3061, 1270, 2161, 3561, 891, 2102, 49, 2978, 1745, 2819, 387, 2944, 3442, 1631, 321, 3609, 1845, 3127],
[3743, 2197, 1438, 3010, 1883, 3596, 150, 2909, 771, 2526, 80, 3924, 663, 3328, 1478, 4039, 1911, 2263, 1727, 2595, 1228, 251, 2542, 3485, 2886, 215, 2492, 965, 42, 1472, 3960, 2437, 830, 2817, 2167, 1259, 3339, 240, 1430, 2743, 1788, 377, 3283, 2804, 1488, 1084, 469, 3348, 2515, 179, 2876, 3741, 1591, 1031, 4076, 1195, 2308, 1797, 8, 2240, 3188, 1082, 2145, 96],
[1551, 694, 3897, 917, 3420, 1313, 2604, 1144, 3715, 1492, 3111, 1232, 2315, 382, 2879, 979, 510, 3772, 70, 3624, 2008, 3049, 1440, 606, 1699, 3326, 1919, 3118, 2188, 2996, 532, 2092, 3149, 400, 1596, 2603, 655, 3080, 3679, 1112, 2232, 3966, 1627, 31, 3507, 2021, 3830, 1760, 621, 3996, 1820, 804, 3327, 2433, 290, 3250, 656, 3858, 984, 2769, 1411, 795, 4049, 2888],
[2560, 1942, 2736, 44, 2303, 733, 3212, 405, 2236, 929, 2759, 1754, 3828, 2048, 1326, 3509, 2666, 904, 2810, 633, 2415, 989, 3890, 2148, 3786, 873, 1542, 676, 3845, 1194, 1746, 3744, 1343, 3626, 947, 3917, 2260, 896, 1966, 146, 3174, 699, 2116, 2673, 835, 2350, 275, 2840, 1557, 1141, 2250, 2732, 528, 1952, 3630, 1502, 2662, 2054, 3531, 546, 3790, 2374, 1761, 579],
[3551, 356, 3147, 1705, 3976, 2080, 1581, 3522, 1808, 4014, 296, 3452, 569, 3154, 123, 2441, 1560, 2112, 3377, 1354, 3092, 1824, 390, 2715, 95, 2307, 3653, 2838, 306, 3350, 2654, 162, 2471, 1996, 2895, 14, 1828, 3529, 2533, 2846, 1327, 3391, 1025, 3775, 2971, 1294, 3645, 970, 3150, 3437, 401, 3874, 1370, 2358, 925, 3027, 211, 1265, 2480, 1924, 3067, 168, 3385, 1209],
[1364, 3851, 1019, 2434, 618, 2939, 185, 2697, 526, 2464, 1954, 864, 2616, 1638, 3903, 755, 3289, 325, 1108, 3970, 169, 3580, 1592, 3259, 1303, 2624, 454, 2045, 1398, 2282, 717, 3478, 1124, 603, 3229, 1495, 3818, 1174, 461, 1574, 3882, 319, 2456, 1856, 575, 1709, 3236, 1976, 71, 2470, 2069, 1094, 3110, 106, 3414, 1700, 3948, 759, 3673, 421, 1133, 2691, 2034, 2983],
[2270, 496, 3302, 1471, 3695, 1113, 3354, 1375, 3783, 1192, 3245, 1420, 2976, 1063, 2162, 3030, 1801, 3725, 1515, 2244, 2912, 809, 2368, 563, 3989, 1074, 3177, 3534, 1002, 4073, 1649, 3059, 1892, 4006, 360, 2701, 739, 2987, 2326, 3304, 790, 1922, 3047, 218, 4018, 2274, 431, 2622, 3905, 1454, 682, 2792, 3597, 1869, 2546, 590, 2219, 2929, 1618, 3335, 1532, 3987, 283, 847],
[2794, 1786, 2539, 237, 2004, 2821, 805, 2182, 3042, 29, 2098, 3666, 223, 3603, 449, 1180, 2510, 686, 2751, 478, 1899, 3438, 1208, 2973, 1980, 1676, 273, 1794, 2940, 86, 2141, 488, 2767, 1290, 2378, 1719, 3431, 282, 2063, 986, 2643, 1464, 3466, 1185, 2773, 913, 3541, 764, 1229, 3002, 3767, 1654, 308, 863, 4027, 1431, 3198, 1054, 85, 2609, 903, 2339, 1683, 3465],
[61, 3643, 1236, 4075, 945, 3492, 1859, 429, 3879, 997, 2844, 702, 2347, 1708, 2785, 4068, 56, 3206, 2025, 3815, 1014, 2564, 5, 3687, 897, 2780, 3926, 2422, 769, 2589, 3803, 926, 3291, 202, 3696, 1048, 2184, 3610, 1659, 4063, 54, 3728, 644, 2154, 1607, 3101, 1409, 2411, 1901, 165, 2134, 3278, 1322, 2645, 2176, 352, 2833, 1891, 3827, 2108, 3121, 640, 3759, 1073],
[3020, 745, 2064, 2651, 1608, 117, 3178, 2576, 1670, 2398, 1528, 3963, 1297, 3392, 595, 2279, 1447, 3547, 1264, 244, 1739, 4045, 2123, 1426, 3310, 643, 2216, 1321, 3398, 1163, 1524, 3571, 2018, 1436, 2559, 625, 2915, 1247, 542, 3134, 2420, 1348, 2881, 3581, 121, 3953, 341, 3369, 2706, 4087, 948, 503, 2901, 3475, 1169, 3706, 713, 3512, 1286, 483, 1392, 3228, 1829, 2168],
[3914, 1514, 3258, 550, 3089, 2318, 1279, 650, 3562, 344, 3297, 1894, 156, 2682, 949, 3108, 1866, 849, 2385, 3358, 2649, 712, 3140, 367, 2478, 1852, 143, 3721, 519, 3103, 328, 2348, 813, 3191, 1778, 3978, 100, 3362, 2724, 868, 1812, 384, 2035, 1039, 2557, 2224, 1781, 1070, 600, 1580, 2305, 3660, 1806, 16, 1544, 2399, 2014, 233, 2748, 2440, 4059, 144, 2858, 395],
[1337, 2388, 305, 3589, 886, 3819, 1934, 4031, 1053, 2923, 832, 2548, 3768, 2000, 1575, 3861, 310, 2954, 3644, 534, 1377, 2859, 1617, 3515, 1128, 3876, 3037, 1569, 2523, 1943, 2871, 1633, 3863, 409, 3011, 1088, 2300, 1932, 1538, 3936, 3208, 2520, 3838, 517, 3266, 722, 3713, 2952, 2005, 3182, 262, 2502, 1016, 3053, 3309, 823, 3925, 1740, 3378, 959, 1640, 3570, 1183, 2507],
[668, 3722, 1731, 2208, 2897, 1432, 253, 2728, 2255, 1747, 3427, 505, 1129, 3192, 398, 2587, 2072, 1037, 1653, 2194, 3944, 198, 2324, 784, 2722, 419, 2088, 1022, 3271, 861, 4029, 64, 2668, 1366, 2078, 3503, 754, 3755, 438, 2209, 183, 1135, 1694, 2925, 1507, 2750, 1316, 40, 3865, 1205, 3548, 671, 3813, 2089, 447, 2583, 1117, 2965, 566, 2284, 2672, 777, 1977, 3408],
[2948, 1008, 2766, 1149, 455, 2490, 3370, 1218, 88, 3737, 1396, 2153, 2870, 773, 3993, 1240, 3458, 2816, 107, 3077, 920, 1926, 3240, 1491, 3613, 1252, 3429, 2269, 230, 2795, 1230, 2160, 3655, 954, 2496, 254, 2831, 1201, 2611, 1389, 3032, 3451, 820, 3627, 238, 1941, 3400, 2335, 852, 2599, 1469, 2864, 1717, 1353, 4000, 2253, 130, 3168, 1484, 3881, 329, 3079, 2138, 201],
[4020, 1912, 2, 3446, 3956, 1835, 610, 3137, 2043, 720, 3063, 269, 3542, 1818, 19, 2438, 629, 1776, 3701, 1158, 2530, 3757, 583, 2039, 38, 2993, 1693, 661, 3779, 1462, 3469, 689, 1837, 3330, 588, 3911, 1750, 3252, 893, 3669, 1875, 662, 2362, 2085, 1255, 3983, 466, 1667, 3083, 406, 2202, 3249, 191, 2717, 630, 1595, 3604, 1958, 874, 1857, 3284, 1254, 3800, 1566],
[837, 2590, 3201, 1656, 791, 2121, 3634, 1504, 2640, 3930, 1594, 2473, 1315, 2228, 3279, 1473, 4061, 817, 2297, 3319, 435, 1331, 2904, 3896, 2448, 962, 4092, 2598, 1881, 551, 2400, 3152, 176, 2740, 1585, 3070, 23, 1481, 2391, 322, 2812, 4043, 90, 3318, 2479, 930, 2665, 3499, 1101, 4050, 1848, 783, 3778, 1241, 2995, 3425, 380, 2784, 3740, 51, 2529, 1042, 465, 2349],
[3526, 585, 1305, 3036, 2426, 173, 2968, 985, 376, 2336, 909, 3678, 556, 2986, 971, 2741, 1960, 3014, 285, 1553, 3491, 2700, 1080, 333, 1784, 3184, 1357, 125, 2891, 3631, 1099, 1711, 3999, 1280, 2247, 1034, 3559, 1986, 3850, 2125, 975, 1616, 3123, 578, 1766, 3008, 1531, 142, 2111, 2443, 535, 3353, 1990, 2372, 980, 1777, 2462, 1152, 2187, 1417, 2878, 3625, 1800, 2712],
[1460, 2030, 3689, 363, 1089, 3325, 1346, 4091, 1969, 3481, 132, 3166, 1691, 3805, 210, 3593, 467, 1410, 3840, 2103, 744, 1723, 2177, 3386, 2633, 502, 1994, 3538, 833, 2292, 351, 2950, 2050, 471, 3416, 2452, 706, 2969, 497, 2692, 1300, 3525, 2262, 1161, 3801, 364, 3686, 2854, 1000, 3158, 1395, 2802, 24, 901, 3641, 250, 4071, 736, 3489, 541, 2075, 696, 3345, 102],
[4002, 939, 2836, 2291, 3892, 1768, 2519, 487, 2803, 1166, 2689, 2086, 1097, 1917, 2610, 1203, 2364, 3220, 2498, 76, 3131, 4019, 178, 885, 1537, 3962, 2220, 1181, 3231, 1510, 3826, 2538, 801, 3705, 1423, 293, 4079, 1121, 1677, 3381, 155, 2577, 746, 2779, 2026, 1373, 692, 1822, 3929, 295, 3578, 1628, 3889, 2630, 2052, 3213, 1310, 2920, 1679, 3135, 3941, 1359, 3005, 2235],
[1715, 3268, 226, 1547, 685, 2747, 853, 3237, 1620, 3848, 657, 3347, 412, 3919, 870, 3406, 1644, 680, 1056, 1838, 2791, 1277, 2408, 3659, 3048, 698, 2826, 260, 2683, 1810, 995, 50, 3114, 1907, 2638, 2172, 2848, 1854, 3169, 841, 3764, 1448, 3901, 271, 3217, 2181, 3445, 2541, 802, 2289, 1914, 613, 1177, 3105, 1444, 511, 2323, 163, 2571, 992, 278, 2409, 1105, 407],
[3094, 1202, 3831, 1997, 3558, 67, 3750, 1878, 289, 2266, 1371, 2417, 1494, 2842, 2204, 145, 2932, 3974, 2659, 3789, 940, 3577, 617, 1910, 1116, 2343, 1663, 3742, 457, 3371, 2110, 3940, 1215, 611, 3280, 923, 112, 3591, 375, 2317, 1968, 548, 2896, 1725, 1051, 4026, 65, 1564, 3293, 1263, 3747, 3026, 2495, 348, 3964, 1872, 3387, 1523, 3842, 1937, 3436, 1586, 3773, 2657],
[752, 2455, 516, 2620, 1266, 2183, 1441, 3054, 1024, 3614, 2914, 41, 3120, 732, 1764, 3520, 1341, 359, 2013, 512, 2252, 1458, 2957, 385, 3853, 15, 3298, 1296, 2465, 737, 2999, 1381, 2771, 3488, 1643, 3795, 1548, 2485, 3955, 1335, 3058, 2435, 1222, 3340, 2623, 880, 2402, 2946, 484, 2698, 119, 2147, 758, 3517, 1075, 2760, 816, 2681, 434, 2217, 889, 2815, 34, 1900],
[3506, 1634, 3163, 921, 3397, 2890, 576, 2380, 3455, 779, 1720, 4042, 1250, 3709, 2545, 598, 2146, 3628, 1600, 3254, 236, 3343, 1975, 3463, 1391, 3099, 2136, 910, 4052, 1619, 3600, 397, 2011, 212, 2356, 1150, 2934, 651, 1799, 1012, 3, 3649, 452, 1895, 204, 3557, 1951, 1115, 3829, 1703, 3413, 1493, 2841, 1755, 2272, 81, 3699, 3065, 1220, 4037, 3238, 645, 3663, 2150],
[1049, 2937, 148, 4057, 1790, 337, 3980, 1948, 184, 2126, 2602, 539, 2032, 318, 3286, 1001, 3073, 1137, 2865, 839, 2581, 1190, 2735, 763, 1752, 2553, 314, 2917, 1946, 140, 2311, 1062, 3885, 2572, 855, 3355, 424, 2096, 3244, 2753, 3459, 2214, 1601, 3733, 3074, 1466, 635, 3144, 388, 2242, 1020, 229, 3676, 677, 3312, 1610, 1983, 601, 2100, 208, 1288, 2544, 1490, 324],
[3909, 1393, 2056, 2310, 812, 2563, 1179, 3211, 1534, 3868, 1076, 3379, 2770, 1572, 2277, 4012, 1890, 58, 2331, 3735, 1682, 4072, 101, 2431, 3907, 1028, 3690, 638, 3441, 1452, 2727, 3210, 567, 1771, 3087, 1408, 4008, 2661, 234, 1501, 778, 2975, 594, 2139, 957, 2729, 3991, 2341, 1298, 2913, 4095, 2017, 2423, 1339, 2962, 942, 3979, 2469, 3590, 1736, 2980, 1827, 3333, 2369],
[2775, 619, 3717, 1126, 3306, 1675, 3656, 952, 2997, 426, 2487, 1850, 882, 3777, 221, 1403, 2716, 3422, 1512, 565, 3021, 983, 1826, 3197, 476, 2060, 1562, 2628, 1162, 3807, 788, 2200, 1687, 3726, 74, 2238, 1267, 730, 3680, 2037, 4066, 1187, 2561, 3871, 1360, 309, 2059, 845, 3619, 1792, 560, 3260, 1130, 3856, 416, 2613, 301, 1387, 1029, 3172, 725, 3810, 477, 860],
[1864, 3124, 242, 2670, 450, 2857, 11, 2239, 2702, 1325, 3568, 110, 3029, 1212, 3186, 2451, 458, 796, 3933, 2081, 297, 2191, 3505, 1231, 2777, 3564, 200, 3161, 525, 1860, 2862, 280, 3546, 978, 3023, 2800, 1929, 3513, 1095, 2381, 334, 1742, 3269, 97, 2818, 3479, 1646, 3199, 45, 2652, 907, 2551, 158, 2120, 3473, 1813, 2893, 3730, 2354, 109, 2723, 1143, 2258, 3462],
[1238, 2476, 1561, 3533, 2166, 1421, 3797, 665, 1811, 3954, 756, 2068, 3495, 642, 1987, 928, 3664, 1796, 2514, 3142, 1318, 3825, 667, 2283, 1486, 867, 2981, 2158, 3986, 1307, 3329, 2518, 1243, 2421, 1578, 509, 3833, 166, 2503, 3130, 938, 3403, 521, 2304, 1863, 715, 2513, 1155, 3791, 1405, 3536, 1684, 3117, 1543, 826, 3221, 1191, 553, 1652, 3543, 2041, 1456, 4081, 73],
[3276, 974, 3937, 1927, 716, 3072, 1283, 2404, 3155, 261, 2809, 1480, 2352, 1704, 2945, 3887, 1271, 2830, 1066, 170, 3368, 1630, 2882, 84, 4028, 2493, 1726, 956, 2376, 33, 1991, 714, 4041, 346, 3424, 1831, 890, 3181, 1662, 1324, 2880, 1999, 1556, 3602, 1065, 3922, 2868, 440, 2165, 3038, 659, 3947, 501, 2797, 2313, 7, 3898, 2180, 3373, 915, 3022, 383, 2873, 1698],
[2115, 533, 2955, 128, 3639, 1757, 368, 3443, 1612, 1040, 3322, 520, 4078, 342, 2648, 26, 2223, 402, 3550, 2393, 723, 2678, 1103, 3303, 1884, 365, 3620, 591, 3394, 2704, 3671, 1529, 2118, 2899, 1077, 3918, 2618, 2275, 605, 3968, 59, 3776, 811, 3015, 2445, 189, 1516, 3366, 1842, 265, 2386, 1931, 1233, 3338, 1427, 2588, 1889, 700, 2509, 255, 1956, 3761, 772, 2632],
];

for(let i = 0; i < 64; i++) {
  for(let j = 0; j < 64; j++) {
    voidAndClusterMatrix[i][j] = (voidAndClusterMatrix[i][j] + 0.5) / (64 * 64) - 0.5;
  }
}

let sRGBCache = new Array(16384);
for(let i = 0; i < 16384; i ++) {
  const val = i / 16383;
  sRGBCache[i] = (val <= 0.0031308 ? val * 12.92 : 1.055 * Math.pow(val, 1 / 2.4) - 0.055) * 255;
}

function draw(callback) {
  for(let y = 0; y < height; y++) {
    let pos = (y * width) << 2;
    for(let x = 0; x < width; x++, pos += 4) {
      const vc = voidAndClusterMatrix[x % 64][y % 64];
      canvasImage.data[pos + 0] = sRGBCache[imageData[pos + 0] >> 2] + vc;
      canvasImage.data[pos + 1] = sRGBCache[imageData[pos + 1] >> 2] + vc;
      canvasImage.data[pos + 2] = sRGBCache[imageData[pos + 2] >> 2] + vc;
    }
  }

  ctx.putImageData(canvasImage, 0, 0);

  postMessage({callback});
}

onmessage = function(msg) {
  if(msg.data.hasOwnProperty('canvas')) {
    canvas = msg.data.canvas;
    ctx = canvas.getContext('2d', {
      willReadFrequently: true,
      colorSpace: 'srgb',
      alpha: false
    });

    ctx.fillStyle = '#fff';
    width = canvas.width;
    height = canvas.height;
    ctx.fillRect(0, 0, width, height);

    canvasImage = ctx.getImageData(0, 0, width, height);
    // imageData is stored in 16-bit linear-RGB
    // 16 bits are used to preserve color quality
    // No alpha channel is used
    imageData = new Uint16Array(width * height * 4).fill(65535);
  }
  else if(msg.data.function === 'draw') {
    drawThings(msg.data.tasks, msg.data.beforeTaskIndex);

    draw(msg.data.params[0]);
  }
  else {
    console.error(`Unknown render command: '${msg.data}'`);
  }
}
